'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { PaletteMode } from '@mui/material'
import createLandingTheme from './landingTheme'

// Create context for theme settings
interface ThemeContextType {
  mode: PaletteMode
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleMode: () => {}
})

// Hook to use theme context
export const useLandingTheme = () => useContext(ThemeContext)

// Theme provider component
interface LandingThemeProviderProps {
  children: ReactNode
}

export const LandingThemeProvider = ({ children }: LandingThemeProviderProps) => {
  // Check if we're on the client side
  const isClient = typeof window !== 'undefined'
  
  // Get initial theme mode from localStorage or default to 'light'
  const getInitialMode = (): PaletteMode => {
    if (!isClient) return 'light'
    
    const savedMode = localStorage.getItem('landingThemeMode')
    return (savedMode as PaletteMode) || 'light'
  }
  
  const [mode, setMode] = useState<PaletteMode>(getInitialMode)
  const [mounted, setMounted] = useState(false)
  
  // Create theme based on current mode
  const theme = createLandingTheme(mode)
  
  // Toggle theme mode
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    if (isClient) {
      localStorage.setItem('landingThemeMode', newMode)
    }
  }
  
  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Avoid rendering with wrong theme on server
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }
  
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default LandingThemeProvider
