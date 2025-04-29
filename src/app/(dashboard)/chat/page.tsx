'use client'

import { Typography, Card, CardContent, Box, TextField, Button, Avatar, Paper } from '@mui/material'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

const ChatPage = () => {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI Tutor. How can I help you with your English learning today?' }
  ])

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to chat history
      setChatHistory([...chatHistory, { role: 'user', content: message }])
      
      // Simulate AI response (in a real app, this would call the API)
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          role: 'assistant', 
          content: 'This is a placeholder response. In the actual application, this would be a response from the AI tutor based on your message.' 
        }])
      }, 1000)
      
      // Clear input field
      setMessage('')
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Box sx={{ p: 4, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Tutor Chat
      </Typography>
      
      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mb: 2 }}>
        <CardContent sx={{ flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
            {chatHistory.map((msg, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2 
                }}
              >
                {msg.role === 'assistant' && (
                  <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>AI</Avatar>
                )}
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    maxWidth: '70%',
                    bgcolor: msg.role === 'user' ? 'primary.light' : 'background.paper',
                    color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary'
                  }}
                >
                  <Typography variant="body1">{msg.content}</Typography>
                </Paper>
                {msg.role === 'user' && (
                  <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>You</Avatar>
                )}
              </Box>
            ))}
          </Box>
        </CardContent>
        
        <Box sx={{ p: 2, display: 'flex', borderTop: '1px solid', borderColor: 'divider' }}>
          <TextField
            fullWidth
            placeholder="Type your message here..."
            variant="outlined"
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            sx={{ mr: 2 }}
          />
          <Button 
            variant="contained" 
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            Send
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default ChatPage
