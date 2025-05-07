'use client'

import { useState, useEffect } from 'react'
import { IconButton, Tooltip, useTheme } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useLandingTheme } from '@/theme/LandingThemeProvider'

interface ThemeToggleProps {
  color?: string
  size?: 'small' | 'medium' | 'large'
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

const ThemeToggle = ({
  color,
  size = 'medium',
  tooltipPlacement = 'bottom'
}: ThemeToggleProps) => {
  const { mode, toggleMode } = useLandingTheme()
  const theme = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // After mounting, we can safely show the button
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Determine icon color based on props or current theme
  const iconColor = color || (mode === 'light' ? theme.palette.primary.main : 'white')
  
  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null
  
  return (
    <Tooltip 
      title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      placement={tooltipPlacement}
      arrow
    >
      <IconButton
        onClick={toggleMode}
        aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        size={size}
        sx={{
          color: iconColor,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'rotate(12deg) scale(1.1)',
            color: theme.palette.primary.main
          }
        }}
      >
        {mode === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
