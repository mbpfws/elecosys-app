import { NextRequest, NextResponse } from 'next/server'
import { generateGeminiContent } from '@/utils/gemini'
import { createClient } from '@/utils/supabase'

// POST /api/mini-apps/writing-tools/analyze-essay
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { prompt, essayHtml, taskType } = body

    if (!prompt || !essayHtml || !taskType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Construct the analysis prompt
    const analysisPrompt = `
    You are an IELTS examiner. Analyze the following essay based on the IELTS criteria:
    - Task Achievement/Response
    - Coherence and Cohesion
    - Lexical Resource
    - Grammatical Range and Accuracy

    The essay is a response to this prompt: "${prompt}"

    Essay: ${essayHtml}

    Provide your analysis in the following JSON format:
    {
      "overallScore": number, // Overall band score (0.0-9.0)
      "criteriaScores": {
        "taskAchievement": number, // Score for Task Achievement/Response (0.0-9.0)
        "coherenceAndCohesion": number, // Score for Coherence and Cohesion (0.0-9.0)
        "lexicalResource": number, // Score for Lexical Resource (0.0-9.0)
        "grammaticalRangeAndAccuracy": number // Score for Grammatical Range and Accuracy (0.0-9.0)
      },
      "feedback": {
        "strengths": string[], // Array of strengths
        "weaknesses": string[], // Array of weaknesses
        "improvementSuggestions": string[] // Array of suggestions for improvement
      }
    }

    Only respond with the JSON object, no additional text.
    `

    // Generate the analysis using Gemini
    const result = await generateGeminiContent(analysisPrompt, undefined, {
      temperature: 0.2, // Lower temperature for more consistent results
      model: 'gemini-2.0-pro' // Use the Pro model for better analysis
    })
    const analysisText = result.text[0].text

    // Parse the JSON response
    let analysis
    try {
      analysis = JSON.parse(analysisText)
    } catch (error) {
      console.error('Error parsing Gemini response:', error)
      return NextResponse.json({ error: 'Invalid response from AI' }, { status: 500 })
    }

    // Get the user from the session
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      // Save the result to the database
      await supabase.from('mini_app_results').insert({
        user_id: session.user.id,
        app_name: 'IELTS Writing Tools',
        task_type: taskType,
        prompt: prompt,
        user_answer: essayHtml,
        ai_response: analysis,
        base_score: analysis.overallScore,
        evaluation_score: analysis.criteriaScores,
        skill_type: 'Writing'
      })
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error analyzing essay:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
