'use client'

import { useState } from 'react'
import { 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  TextField, 
  Button, 
  Tabs, 
  Tab, 
  Avatar,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const AccountSettingsPage = () => {
  const [tabValue, setTabValue] = useState(0)
  const [showApiKey, setShowApiKey] = useState(false)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleToggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>
      
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="account settings tabs">
            <Tab label="Account" id="account-tab-0" aria-controls="account-tabpanel-0" />
            <Tab label="Security" id="account-tab-1" aria-controls="account-tabpanel-1" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                sx={{ width: 100, height: 100, mb: 2 }}
                alt="User Avatar"
                src="/placeholder-avatar.jpg"
              />
              <Button variant="outlined" sx={{ mb: 1 }}>
                Upload New Avatar
              </Button>
              <Button variant="text" color="error" size="small">
                Remove
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue="John Doe"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                defaultValue="john.doe@example.com"
                margin="normal"
                disabled
              />
              <Box sx={{ mt: 3 }}>
                <Button variant="contained">
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            API Key Management
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Add your Google Gemini API key to use AI features beyond the free tier limitations.
          </Typography>
          
          <TextField
            fullWidth
            label="Gemini API Key"
            type={showApiKey ? 'text' : 'password'}
            defaultValue="••••••••••••••••1234"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle api key visibility"
                    onClick={handleToggleApiKeyVisibility}
                    edge="end"
                  >
                    {showApiKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained">
              Save Key
            </Button>
            <Button variant="outlined" color="error">
              Remove Key
            </Button>
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              margin="normal"
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              margin="normal"
            />
            <Box sx={{ mt: 3 }}>
              <Button variant="contained">
                Update Password
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Card>
    </Box>
  )
}

export default AccountSettingsPage
