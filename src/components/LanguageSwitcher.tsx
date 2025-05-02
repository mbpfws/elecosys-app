'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Menu, MenuItem } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from '@/utils/i18n'
import { useCurrentLocale, useChangeLocale } from '@/configs/i18n'

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const { t } = useTranslation()
  const currentLocale = useCurrentLocale()
  const changeLocale = useChangeLocale()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (locale: string) => {
    changeLocale(locale)
    handleClose()
  }

  return (
    <>
      <Button
        color="inherit"
        startIcon={<LanguageIcon />}
        onClick={handleClick}
        size="small"
      >
        {currentLocale === 'en' ? 'English' : 'Tiếng Việt'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={() => handleLanguageChange('en')}
          selected={currentLocale === 'en'}
        >
          English
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('vi')}
          selected={currentLocale === 'vi'}
        >
          Tiếng Việt
        </MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSwitcher
