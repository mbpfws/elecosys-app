'use client'

import { 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Grid, 
  Avatar, 
  Divider, 
  Chip, 
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useState } from 'react'

interface UserViewPageProps {
  params: {
    userId: string
  }
}

// Mock user data
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Student',
  status: 'Active',
  joinDate: '2025-01-15T10:30:00Z',
  lastLogin: '2025-04-29T10:30:00Z',
  apiKeyStatus: 'Set',
  activities: [
    { id: 1, type: 'Writing Tools', date: '2025-04-29T14:30:00Z', score: 7.5 },
    { id: 2, type: 'Adaptive Test', date: '2025-04-28T11:15:00Z', score: 8.0 },
    { id: 3, type: 'Writing Tools', date: '2025-04-25T16:45:00Z', score: 7.0 }
  ]
}

const UserViewPage = ({ params }: UserViewPageProps) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                sx={{ width: 100, height: 100, mb: 2 }}
                alt={user.name}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">{user.name}</Typography>
              <Chip 
                label={user.role} 
                color={user.role === 'Admin' ? 'secondary' : 'default'} 
                size="small"
                sx={{ mt: 1 }}
              />
              <Chip 
                label={user.status} 
                color={user.status === 'Active' ? 'success' : 'error'} 
                size="small"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Role" secondary={user.role} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Join Date" 
                    secondary={new Date(user.joinDate).toLocaleDateString()} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Last Login" 
                    secondary={new Date(user.lastLogin).toLocaleDateString()} 
                  />
                </ListItem>
              </List>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary">
                  Edit User
                </Button>
                {user.status === 'Active' ? (
                  <Button variant="outlined" color="error">
                    Deactivate
                  </Button>
                ) : (
                  <Button variant="outlined" color="success">
                    Activate
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="user details tabs">
            <Tab label="Activity" id="user-tab-0" aria-controls="user-tabpanel-0" />
            <Tab label="Settings" id="user-tab-1" aria-controls="user-tabpanel-1" />
          </Tabs>
        </Box>
        
        <CardContent>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {user.activities.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemText 
                      primary={activity.type} 
                      secondary={`Date: ${new Date(activity.date).toLocaleDateString()} | Score: ${activity.score}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                User Settings
              </Typography>
              <List>
                <ListItem divider>
                  <ListItemText 
                    primary="API Key Status" 
                    secondary={user.apiKeyStatus} 
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Enabled" 
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default UserViewPage
