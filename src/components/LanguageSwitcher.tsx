'use client'

import { useState, useEffect } from 'react'
import { Button, Menu, MenuItem, Badge, IconButton } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from '@/utils/i18n'
import { localeNames } from '@/configs/i18n'

interface LanguageSwitcherProps {
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  iconOnly?: boolean;
}

const LanguageSwitcher = ({ color = 'inherit', iconOnly = false }: LanguageSwitcherProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { t, currentLocale, changeLocale } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Only show component after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (locale: string) => {
    console.log(`Changing language to: ${locale}`)
    changeLocale(locale)
    handleClose()
  }

  // Server-side rendering fallback
  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return iconOnly ? (
      <IconButton
        color={color}
        sx={{ visibility: 'hidden' }}
      >
        <LanguageIcon />
      </IconButton>
    ) : (
      <Button
        color={color}
        startIcon={<LanguageIcon />}
        size="small"
        sx={{ textTransform: 'none', visibility: 'hidden' }}
      >
        {/* Use a static placeholder to avoid hydration mismatch */}
        Language
      </Button>
    );
  }

  return (
    <>
      {iconOnly ? (
        <IconButton
          color={color}
          onClick={handleClick}
          size="small"
        >
          <LanguageIcon />
        </IconButton>
      ) : (
        <Button
          color={color}
          startIcon={<LanguageIcon />}
          onClick={handleClick}
          size="small"
          sx={{ textTransform: 'none' }}
        >
          {localeNames[currentLocale as keyof typeof localeNames] || 'Language'}
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => handleLanguageChange('en')}
          selected={currentLocale === 'en'}
          dense
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('vi')}
          selected={currentLocale === 'vi'}
          dense
        >
          Tiếng Việt
        </MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSwitcher
