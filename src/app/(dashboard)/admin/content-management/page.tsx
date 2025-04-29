'use client'

import { 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'

// Mock data for prompts
const prompts = [
  {
    id: 1,
    name: 'IELTS Writing Task 1 Prompt',
    category: 'writing-tools',
    content: 'You are an IELTS examiner. Generate a Task 1 writing prompt with a chart or graph description. The prompt should be challenging but fair for a test-taker aiming for Band 7 or higher.',
    isActive: true
  },
  {
    id: 2,
    name: 'IELTS Writing Task 2 Prompt',
    category: 'writing-tools',
    content: 'You are an IELTS examiner. Generate a Task 2 writing prompt on a contemporary issue. The prompt should be suitable for academic IELTS and require the test-taker to present and justify an opinion.',
    isActive: true
  },
  {
    id: 3,
    name: 'IELTS Writing Analysis',
    category: 'writing-tools',
    content: 'You are an IELTS examiner. Analyze the following essay based on the IELTS criteria: Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Provide a band score for each criterion and an overall band score. Include specific feedback for improvement.',
    isActive: true
  },
  {
    id: 4,
    name: 'Reading Question Generator',
    category: 'adaptive-test',
    content: 'Generate a reading comprehension question at {difficulty} level. The question should be multiple choice with 4 options, only one of which is correct. Return the question in JSON format with fields for question text, options array, and correct answer index.',
    isActive: true
  }
]

const ContentManagementPage = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [promptContent, setPromptContent] = useState('')
  
  const handlePromptSelect = (id: number) => {
    const prompt = prompts.find(p => p.id === id)
    if (prompt) {
      setSelectedPrompt(id)
      setPromptContent(prompt.content)
      setEditMode(false)
    }
  }
  
  const handleEditToggle = () => {
    setEditMode(!editMode)
  }
  
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromptContent(event.target.value)
  }
  
  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving prompt:', { id: selectedPrompt, content: promptContent })
    setEditMode(false)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Content Management
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Prompts
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="category-filter-label">Filter by Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  id="category-filter"
                  label="Filter by Category"
                  defaultValue="all"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="writing-tools">Writing Tools</MenuItem>
                  <MenuItem value="adaptive-test">Adaptive Test</MenuItem>
                  <MenuItem value="chat">AI Chat</MenuItem>
                </Select>
              </FormControl>
              
              {prompts.map((prompt) => (
                <Accordion 
                  key={prompt.id}
                  expanded={selectedPrompt === prompt.id}
                  onChange={() => handlePromptSelect(prompt.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{prompt.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Category: {prompt.category}
                    </Typography>
                    <Typography variant="body2">
                      {prompt.content.substring(0, 100)}...
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
              
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 3 }}
              >
                Add New Prompt
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  {selectedPrompt 
                    ? prompts.find(p => p.id === selectedPrompt)?.name 
                    : 'Prompt Details'}
                </Typography>
                {selectedPrompt && (
                  <Button 
                    variant="outlined"
                    onClick={handleEditToggle}
                  >
                    {editMode ? 'Cancel' : 'Edit'}
                  </Button>
                )}
              </Box>
              
              {selectedPrompt ? (
                <>
                  <TextField
                    label="Prompt Content"
                    multiline
                    rows={10}
                    fullWidth
                    value={promptContent}
                    onChange={handleContentChange}
                    disabled={!editMode}
                    sx={{ mb: 3 }}
                  />
                  
                  {editMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <Button 
                        variant="contained"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Usage Statistics
                  </Typography>
                  <Typography variant="body2">
                    This prompt has been used 157 times in the last 30 days.
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ py: 10, textAlign: 'center' }}>
                  Select a prompt from the list to view and edit its details.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContentManagementPage
