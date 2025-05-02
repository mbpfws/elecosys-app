'use client'

// React Imports
import { ReactNode, useMemo } from 'react'

// MUI Imports
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Type Imports
import type { Direction, SystemMode } from '@core/types'

// Config Imports
import themeConfig from '@/configs/themeConfig'

// Theme Options Imports
import { lightPalette, darkPalette } from './palette'
import typography from './typography'
import breakpoints from './breakpoints'
import spacing from './spacing'
import shadows from './shadows'
import componentsOverride from './overrides'

type Props = {
  children: ReactNode
  direction?: Direction
  systemMode?: SystemMode
}

const CustomThemeProvider = (props: Props) => {
  // Props
  const { children, direction = 'ltr', systemMode = 'light' } = props

  // Create theme
  const theme = useMemo(() => {
    // Choose palette based on mode
    const palette = systemMode === 'light' ? lightPalette : darkPalette

    // Create base theme
    const baseTheme = createTheme({
      palette,
      typography,
      breakpoints,
      ...spacing,
      direction,
      shape: {
        borderRadius: 6
      },
      shadows: shadows(systemMode)
    })

    // Add component overrides
    return createTheme(baseTheme, {
      components: componentsOverride(baseTheme)
    })
  }, [direction, systemMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
