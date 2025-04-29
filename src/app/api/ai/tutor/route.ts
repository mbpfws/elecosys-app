import { NextRequest, NextResponse } from 'next/server'
import { createGeminiChat } from '@/utils/gemini'

// POST /api/ai/tutor
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { message, history = [] } = body

    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 })
    }

    // Create a chat session
    const chat = await createGeminiChat()

    // Construct the system prompt
    const systemPrompt = `You are an AI English tutor specializing in IELTS preparation.
    Your role is to help students improve their English skills and prepare for the IELTS exam.
    You can provide explanations, examples, and guidance on grammar, vocabulary, writing, reading, listening, and speaking.
    Be friendly, encouraging, and provide clear, concise explanations.
    If asked about topics unrelated to English learning or IELTS preparation, politely redirect the conversation back to English learning.`

    // Add system prompt to history if it's a new conversation
    if (history.length === 0) {
      await chat.sendMessage({
        role: 'system',
        content: systemPrompt
      })
    }

    // Add previous messages to the chat
    for (const msg of history) {
      await chat.sendMessage({
        role: msg.role,
        content: msg.content
      })
    }

    // Send the user message and get the response
    const response = await chat.sendMessage({
      role: 'user',
      content: message
    })

    const aiResponse = response.content

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Error in AI tutor chat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
