import { NextRequest, NextResponse } from 'next/server'
import { generateGeminiContent } from '@/utils/gemini'

// POST /api/mini-apps/writing-tools/generate-prompt
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { taskType } = body

    if (!taskType || (taskType !== 'Task 1' && taskType !== 'Task 2')) {
      return NextResponse.json({ error: 'Invalid task type' }, { status: 400 })
    }

    // Construct the prompt based on the task type
    let promptText = ''

    if (taskType === 'Task 1') {
      promptText = `You are an IELTS examiner. Generate a Task 1 writing prompt with a chart or graph description.
      The prompt should be challenging but fair for a test-taker aiming for Band 7 or higher.
      Only provide the prompt text without any additional explanations or instructions.`
    } else {
      promptText = `You are an IELTS examiner. Generate a Task 2 writing prompt on a contemporary issue.
      The prompt should be suitable for academic IELTS and require the test-taker to present and justify an opinion.
      Only provide the prompt text without any additional explanations or instructions.`
    }

    // Generate the prompt using Gemini
    const result = await generateGeminiContent(promptText)
    const prompt = result.text[0].text

    return NextResponse.json({ prompt })
  } catch (error) {
    console.error('Error generating prompt:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
