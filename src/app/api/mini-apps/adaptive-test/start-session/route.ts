import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid'

// POST /api/mini-apps/adaptive-test/start-session
export async function POST(request: NextRequest) {
  try {
    // Get the user from the session
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Generate a unique session ID
    const sessionId = uuidv4()
    
    // Initialize session state
    const sessionState = {
      userId: session.user.id,
      sessionId,
      currentDifficulty: 3, // Start at medium difficulty (1-5 scale)
      currentSkill: 'Reading', // Start with Reading
      questionsAnswered: 0,
      correctAnswers: 0,
      skills: ['Reading', 'Grammar', 'Vocabulary'],
      history: [],
      startTime: new Date().toISOString()
    }
    
    // Store the session state in the database
    await supabase.from('adaptive_test_sessions').insert({
      id: sessionId,
      user_id: session.user.id,
      state: sessionState,
      created_at: new Date().toISOString()
    })
    
    return NextResponse.json({ sessionId })
  } catch (error) {
    console.error('Error starting adaptive test session:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
