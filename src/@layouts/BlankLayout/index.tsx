'use client'

// React Imports
import { ReactNode } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

// Type Imports
import type { SystemMode } from '@core/types'

interface BlankLayoutProps {
  children: ReactNode
  systemMode?: SystemMode
}

const BlankLayout = (props: BlankLayoutProps) => {
  // Props
  const { children } = props

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme => theme.spacing(2),
        backgroundColor: theme => theme.palette.background.default
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            boxShadow: theme => theme.shadows[3]
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  )
}

export default BlankLayout
