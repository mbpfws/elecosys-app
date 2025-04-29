import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase'
import { getGeminiClient } from '@/utils/gemini'
import { v4 as uuidv4 } from 'uuid'

// POST /api/mini-apps/adaptive-test/get-next-question
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { sessionId, currentDifficulty, currentSkill } = body
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
    }
    
    // Get the session from the database
    const supabase = createClient()
    const { data: sessionData, error: sessionError } = await supabase
      .from('adaptive_test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()
    
    if (sessionError || !sessionData) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }
    
    // Get the session state
    const sessionState = sessionData.state
    
    // Determine the skill and difficulty for the next question
    const skill = currentSkill || sessionState.currentSkill
    const difficulty = currentDifficulty || sessionState.currentDifficulty
    
    // Get the Gemini client
    const geminiClient = getGeminiClient()
    
    // Construct the prompt based on the skill and difficulty
    let promptText = ''
    
    if (skill === 'Reading') {
      promptText = `Generate a reading comprehension question at difficulty level ${difficulty} (on a scale of 1-5, where 5 is most difficult).
      The question should be multiple choice with 4 options, only one of which is correct.
      
      Return the question in the following JSON format:
      {
        "questionType": "multiple-choice-single",
        "passage": "A short reading passage appropriate for the difficulty level",
        "question": "The question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctOptionIndex": 0, // Index of the correct option (0-3)
        "skill": "Reading",
        "difficulty": ${difficulty}
      }
      
      Only respond with the JSON object, no additional text.`
    } else if (skill === 'Grammar') {
      promptText = `Generate a grammar question at difficulty level ${difficulty} (on a scale of 1-5, where 5 is most difficult).
      The question should be multiple choice with 4 options, only one of which is correct.
      
      Return the question in the following JSON format:
      {
        "questionType": "multiple-choice-single",
        "question": "The question text, e.g., 'Choose the correct form of the verb to complete the sentence: He ____ to the store yesterday.'",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctOptionIndex": 0, // Index of the correct option (0-3)
        "skill": "Grammar",
        "difficulty": ${difficulty}
      }
      
      Only respond with the JSON object, no additional text.`
    } else if (skill === 'Vocabulary') {
      promptText = `Generate a vocabulary question at difficulty level ${difficulty} (on a scale of 1-5, where 5 is most difficult).
      The question should be multiple choice with 4 options, only one of which is correct.
      
      Return the question in the following JSON format:
      {
        "questionType": "multiple-choice-single",
        "question": "The question text, e.g., 'What is the meaning of the word 'ubiquitous'?'",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctOptionIndex": 0, // Index of the correct option (0-3)
        "skill": "Vocabulary",
        "difficulty": ${difficulty}
      }
      
      Only respond with the JSON object, no additional text.`
    }
    
    // Generate the question using Gemini
    const result = await geminiClient.generateContent(promptText)
    const response = await result.response
    const questionText = response.text()
    
    // Parse the JSON response
    let question
    try {
      question = JSON.parse(questionText)
    } catch (error) {
      console.error('Error parsing Gemini response:', error)
      return NextResponse.json({ error: 'Invalid response from AI' }, { status: 500 })
    }
    
    // Generate a unique question ID
    const questionId = uuidv4()
    
    // Add the question ID to the question object
    question.id = questionId
    
    // Store the question in the database
    await supabase.from('adaptive_test_questions').insert({
      id: questionId,
      session_id: sessionId,
      question: question,
      created_at: new Date().toISOString()
    })
    
    return NextResponse.json({
      question,
      questionId,
      skill
    })
  } catch (error) {
    console.error('Error getting next question:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
