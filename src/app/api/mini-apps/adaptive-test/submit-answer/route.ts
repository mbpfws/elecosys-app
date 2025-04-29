import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase'

// POST /api/mini-apps/adaptive-test/submit-answer
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { sessionId, questionId, answer } = body
    
    if (!sessionId || !questionId || answer === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Get the session and question from the database
    const supabase = createClient()
    
    // Get the question
    const { data: questionData, error: questionError } = await supabase
      .from('adaptive_test_questions')
      .select('*')
      .eq('id', questionId)
      .single()
    
    if (questionError || !questionData) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }
    
    // Get the session
    const { data: sessionData, error: sessionError } = await supabase
      .from('adaptive_test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()
    
    if (sessionError || !sessionData) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }
    
    // Get the question and session state
    const question = questionData.question
    const sessionState = sessionData.state
    
    // Determine if the answer is correct
    let isCorrect = false
    
    if (question.questionType === 'multiple-choice-single') {
      // For multiple choice questions, compare the selected option index
      isCorrect = answer === question.correctOptionIndex
    } else if (question.questionType === 'fill-in-blank') {
      // For fill-in-blank questions, compare the text (case-insensitive)
      isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase()
    }
    
    // Update the session state
    const updatedSessionState = {
      ...sessionState,
      questionsAnswered: sessionState.questionsAnswered + 1,
      correctAnswers: sessionState.correctAnswers + (isCorrect ? 1 : 0),
      currentDifficulty: calculateNextDifficulty(sessionState.currentDifficulty, isCorrect),
      currentSkill: getNextSkill(sessionState.skills, sessionState.currentSkill),
      history: [
        ...sessionState.history,
        {
          questionId,
          skill: question.skill,
          difficulty: question.difficulty,
          isCorrect
        }
      ]
    }
    
    // Determine if the session should end
    const endSession = updatedSessionState.questionsAnswered >= 20 // End after 20 questions
    
    // If the session is ending, calculate the final score
    let finalSummary = null
    
    if (endSession) {
      finalSummary = {
        totalQuestions: updatedSessionState.questionsAnswered,
        correctAnswers: updatedSessionState.correctAnswers,
        incorrectAnswers: updatedSessionState.questionsAnswered - updatedSessionState.correctAnswers,
        finalDifficulty: updatedSessionState.currentDifficulty,
        estimatedBand: calculateEstimatedBand(updatedSessionState.currentDifficulty),
        skills: sessionState.skills,
        endTime: new Date().toISOString()
      }
      
      // Save the final result to mini_app_results
      await supabase.from('mini_app_results').insert({
        user_id: sessionState.userId,
        app_name: 'IELTS Adaptive Test',
        final_score: finalSummary.estimatedBand,
        evaluation_score: {
          correct: finalSummary.correctAnswers,
          incorrect: finalSummary.incorrectAnswers,
          total: finalSummary.totalQuestions
        },
        skill_type: sessionState.skills.join(','),
        level: finalSummary.finalDifficulty,
        created_at: new Date().toISOString()
      })
    }
    
    // Update the session in the database
    await supabase
      .from('adaptive_test_sessions')
      .update({
        state: updatedSessionState,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
    
    // Save the answer
    await supabase.from('adaptive_test_answers').insert({
      question_id: questionId,
      session_id: sessionId,
      user_answer: answer,
      is_correct: isCorrect,
      created_at: new Date().toISOString()
    })
    
    return NextResponse.json({
      isCorrect,
      nextDifficulty: updatedSessionState.currentDifficulty,
      nextSkill: updatedSessionState.currentSkill,
      endSession,
      finalSummary
    })
  } catch (error) {
    console.error('Error submitting answer:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Helper function to calculate the next difficulty level
function calculateNextDifficulty(currentDifficulty: number, isCorrect: boolean): number {
  // Increase difficulty if correct, decrease if incorrect
  let nextDifficulty = currentDifficulty + (isCorrect ? 0.5 : -0.5)
  
  // Ensure difficulty stays within bounds (1-5)
  nextDifficulty = Math.max(1, Math.min(5, nextDifficulty))
  
  return nextDifficulty
}

// Helper function to get the next skill in rotation
function getNextSkill(skills: string[], currentSkill: string): string {
  const currentIndex = skills.indexOf(currentSkill)
  const nextIndex = (currentIndex + 1) % skills.length
  return skills[nextIndex]
}

// Helper function to calculate estimated band score based on difficulty
function calculateEstimatedBand(difficulty: number): number {
  // Simple mapping from difficulty (1-5) to band score (0-9)
  // This is a simplified approach and should be refined based on actual data
  return Math.min(9, difficulty * 1.8)
}
