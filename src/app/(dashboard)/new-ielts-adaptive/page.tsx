'use client'

import { Typography, Card, CardContent, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import { useState } from 'react'

const AdaptiveTestPage = () => {
  const [testStarted, setTestStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')

  const handleStartTest = () => {
    setTestStarted(true)
  }

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value)
  }

  const handleSubmitAnswer = () => {
    // This would submit the answer and get the next question
    console.log('Answer submitted:', selectedAnswer)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        IELTS Adaptive Test
      </Typography>
      
      {!testStarted ? (
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Start a New Test
            </Typography>
            <Typography variant="body1" paragraph>
              This adaptive test will assess your skills in Reading, Grammar, and Vocabulary. 
              The questions will adjust to your skill level as you progress.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The test consists of approximately 20 questions and will take about 15-20 minutes to complete.
            </Typography>
            <Button variant="contained" onClick={handleStartTest}>
              Start Test
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">
                Question 1 / 20
              </Typography>
              <Typography variant="subtitle1">
                Skill: Reading
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph>
              Read the following passage and answer the question:
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
              The Internet has transformed the way people work and communicate. It has upended countless industries and changed our world forever. However, with these advancements come new challenges related to privacy and security.
            </Typography>
            
            <Typography variant="body1" paragraph>
              What is the main idea of this passage?
            </Typography>
            
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="question"
                name="question"
                value={selectedAnswer}
                onChange={handleAnswerChange}
              >
                <FormControlLabel value="A" control={<Radio />} label="The Internet has made work easier" />
                <FormControlLabel value="B" control={<Radio />} label="Privacy concerns are increasing" />
                <FormControlLabel value="C" control={<Radio />} label="The Internet has transformed society with both benefits and challenges" />
                <FormControlLabel value="D" control={<Radio />} label="Security is the biggest problem with the Internet" />
              </RadioGroup>
            </FormControl>
            
            <Box sx={{ mt: 3 }}>
              <Button 
                variant="contained" 
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default AdaptiveTestPage
