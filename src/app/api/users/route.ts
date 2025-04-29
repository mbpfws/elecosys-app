import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase'

// GET /api/users - Get user profile
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get the user from the session
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get the user profile from the database
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/users - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get the user from the session
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get the request body
    const body = await request.json()
    
    // Update the user profile in the database
    const { data, error } = await supabase
      .from('profiles')
      .update(body)
      .eq('id', session.user.id)
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
