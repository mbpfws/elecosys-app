import { NextRequest, NextResponse } from 'next/server'
import { getGeminiClient } from '@/utils/gemini'

// POST /api/ai/contextual-help
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { question, context, history = [] } = body
    
    if (!question || !context) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Get the Gemini client
    const geminiClient = getGeminiClient()
    
    // Construct the chat history for context
    const chatHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))
    
    // Construct the system prompt based on the context
    let systemPrompt = `You are an AI assistant providing contextual help for an English learning platform. `
    
    if (context.feature === 'Writing Tools') {
      systemPrompt += `The user is currently using the IELTS Writing Tools feature and has a question about their writing feedback.
      
      Context:
      - Score: ${context.score || 'N/A'}
      - Criteria: ${context.criteria || 'N/A'}
      - User Text Snippet: "${context.userTextSnippet || 'N/A'}"
      
      Provide a helpful, concise explanation related to this specific writing feedback. Focus on explaining the criteria, 
      the score, and how the user can improve their writing based on the snippet provided.`
    } else if (context.feature === 'Adaptive Test') {
      systemPrompt += `The user is currently taking an IELTS Adaptive Test and has a question about a specific question or concept.
      
      Context:
      - Question: "${context.questionText || 'N/A'}"
      - User Answer: "${context.userAnswer || 'N/A'}"
      - Skill: ${context.skill || 'N/A'}
      
      Provide a helpful, concise explanation related to this specific question or concept. Focus on explaining 
      the correct approach, any relevant grammar or vocabulary rules, and how this relates to the IELTS exam.`
    } else {
      systemPrompt += `Provide a helpful, concise explanation related to the user's question about English learning or IELTS preparation.`
    }
    
    // Start a chat session
    const chat = geminiClient.startChat({
      history: chatHistory,
      systemInstruction: systemPrompt
    })
    
    // Send the question and get the response
    const result = await chat.sendMessage(question)
    const response = await result.response
    const aiResponse = response.text()
    
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Error in contextual help:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
