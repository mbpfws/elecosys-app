'use client'

import { useState, useEffect } from 'react'
import { Button, Menu, MenuItem, Badge } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from '@/utils/i18n'
import { localeNames } from '@/configs/i18n'

const LanguageSwitcher = () => {
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

  if (!mounted) {
    return null
  }

  return (
    <>
      <Button
        color="inherit"
        startIcon={<LanguageIcon />}
        onClick={handleClick}
        size="small"
        sx={{ textTransform: 'none' }}
      >
        {localeNames[currentLocale as keyof typeof localeNames]}
      </Button>
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
