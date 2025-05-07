'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'

type SkinType = 'default' | 'bordered'

interface Settings {
  skin: SkinType
  mode: 'light' | 'dark'
}

export function useSettings() {
  const theme = useTheme()
  const [settings, setSettings] = useState<Settings>({
    skin: 'default',
    mode: theme.palette.mode
  })

  // Load settings from localStorage on client side
  useEffect(() => {
    const storedSettings = localStorage.getItem('settings')
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings)
        setSettings(parsedSettings)
      } catch (error) {
        console.error('Error parsing settings from localStorage:', error)
      }
    }
  }, [])

  // Save settings to localStorage
  const saveSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem('settings', JSON.stringify(updatedSettings))
  }

  return {
    settings,
    saveSettings
  }
}
