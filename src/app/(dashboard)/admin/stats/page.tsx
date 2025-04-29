'use client'

import { 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Grid, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'

// Mock data for statistics
const stats = {
  totalUsers: 256,
  activeUsers: 198,
  newUsersThisMonth: 42,
  writingToolsUsage: 523,
  adaptiveTestUsage: 412,
  chatUsage: 789,
  averageWritingScore: 7.2,
  averageAdaptiveScore: 7.8,
  topPerformingUsers: [
    { id: 1, name: 'Jane Smith', score: 8.5 },
    { id: 2, name: 'John Doe', score: 8.3 },
    { id: 3, name: 'Alice Johnson', score: 8.1 }
  ],
  mostActiveUsers: [
    { id: 1, name: 'Bob Williams', activities: 45 },
    { id: 2, name: 'Sarah Davis', activities: 38 },
    { id: 3, name: 'Michael Brown', activities: 32 }
  ]
}

const StatsPage = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Platform Usage Statistics
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Statistics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalUsers}
                  </Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active Users
                  </Typography>
                  <Typography variant="h4">
                    {stats.activeUsers}
                  </Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    New Users This Month
                  </Typography>
                  <Typography variant="h4">
                    {stats.newUsersThisMonth}
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feature Usage
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Writing Tools Sessions
                  </Typography>
                  <Typography variant="h4">
                    {stats.writingToolsUsage}
                  </Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Adaptive Test Sessions
                  </Typography>
                  <Typography variant="h4">
                    {stats.adaptiveTestUsage}
                  </Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Chat Interactions
                  </Typography>
                  <Typography variant="h4">
                    {stats.chatUsage}
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Average Writing Score
                  </Typography>
                  <Typography variant="h4">
                    {stats.averageWritingScore}
                  </Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Average Adaptive Test Score
                  </Typography>
                  <Typography variant="h4">
                    {stats.averageAdaptiveScore}
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Performing Users
              </Typography>
              <List>
                {stats.topPerformingUsers.map((user, index) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <ListItemText 
                        primary={`${index + 1}. ${user.name}`} 
                        secondary={`Average Score: ${user.score}`} 
                      />
                    </ListItem>
                    {index < stats.topPerformingUsers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Most Active Users
              </Typography>
              <List>
                {stats.mostActiveUsers.map((user, index) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <ListItemText 
                        primary={`${index + 1}. ${user.name}`} 
                        secondary={`Activities: ${user.activities}`} 
                      />
                    </ListItem>
                    {index < stats.mostActiveUsers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StatsPage
