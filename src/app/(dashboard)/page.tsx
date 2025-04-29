'use client'

import { Typography, Card, CardContent, Grid, Box } from '@mui/material'

const DashboardPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                IELTS Writing Tools
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Practice your IELTS writing skills with AI-generated prompts and receive detailed feedback.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                IELTS Adaptive Test
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Take adaptive tests that adjust to your skill level for Reading, Grammar, and Vocabulary.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                AI Tutor Chat
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chat with an AI tutor to get help with your English learning journey.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage
