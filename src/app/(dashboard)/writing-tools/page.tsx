'use client'

import { Typography, Card, CardContent, Box, Button, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useState } from 'react'

const WritingToolsPage = () => {
  const [taskType, setTaskType] = useState('Task 2')

  const handleTaskTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTaskType: string | null,
  ) => {
    if (newTaskType !== null) {
      setTaskType(newTaskType)
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        IELTS Writing Tools
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Select Task Type
          </Typography>
          <ToggleButtonGroup
            value={taskType}
            exclusive
            onChange={handleTaskTypeChange}
            aria-label="task type"
          >
            <ToggleButton value="Task 1" aria-label="Task 1">
              Task 1
            </ToggleButton>
            <ToggleButton value="Task 2" aria-label="Task 2">
              Task 2
            </ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
      </Card>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Writing Prompt
          </Typography>
          <Typography variant="body1" paragraph>
            {taskType === 'Task 1' 
              ? 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
              : 'Some people believe that unpaid community service should be a compulsory part of high school education. To what extent do you agree or disagree?'
            }
          </Typography>
          <Button variant="contained">Generate New Prompt</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Your Response
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Use the editor below to write your response. The editor will be implemented with Tiptap.
          </Typography>
          <Box sx={{ height: 300, border: '1px solid #ccc', borderRadius: 1, p: 2, mb: 2 }}>
            [Tiptap Editor Placeholder]
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">
              Word Count: 0
            </Typography>
            <Button variant="contained">Analyze Essay</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default WritingToolsPage
