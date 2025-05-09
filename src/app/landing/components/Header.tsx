'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import FrontMenu from './FrontMenu'

// Util Imports
import { useTranslation } from '@/utils/i18n'
import { useLandingTheme } from '@/theme/LandingThemeProvider'

// Styles Imports
import styles from '../styles/landing.module.css'
import frontCommonStyles from '../styles/frontCommon.module.css'

const Header = () => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Hooks
  const { t } = useTranslation()
  const { mode } = useLandingTheme()
  const isBelowLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  return (
    <header className={classnames(styles.header)}>
      <div className={classnames(styles.navbar, { [styles.headerScrolled]: trigger })}>
        <div className={classnames(styles.navbarContent, frontCommonStyles.layoutSpacing)}>
          {isBelowLgScreen ? (
            <div className='flex items-center gap-2 sm:gap-4'>
              <IconButton onClick={() => setIsDrawerOpen(true)} className='-mis-2'>
                <i className='ri-menu-line text-textPrimary' />
              </IconButton>
              <Link href='/landing'>
                <div className='flex items-center min-bs-[24px]'>
                  <img
                    src={mode === 'light' ? "/logo/Logo-dark.svg" : "/logo/Logo-light.svg"}
                    alt="Logo"
                    className={classnames('text-[22px] text-primary mr-2 h-8 w-8', styles.logoImage)}
                  />
                  <span className='text-[1.25rem] font-semibold'>{t('landing.appName')}</span>
                </div>
              </Link>
              <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          ) : (
            <div className='flex items-center gap-10'>
              <Link href='/landing'>
                <div className='flex items-center min-bs-[24px]'>
                  <img
                    src={mode === 'light' ? "/logo/Logo-dark.svg" : "/logo/Logo-light.svg"}
                    alt="Logo"
                    className={classnames('text-[22px] text-primary mr-2 h-8 w-8', styles.logoImage)}
                  />
                  <span className='text-[1.25rem] font-semibold'>{t('landing.appName')}</span>
                </div>
              </Link>
              <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          )}
          <div className='flex items-center gap-2 sm:gap-4'>
            <ThemeToggle />
            <LanguageSwitcher />
            {isBelowLgScreen ? (
              <IconButton
                component={Link}
                href='/pages/login'
                color='primary'
              >
                <i className='ri-user-line text-xl' />
              </IconButton>
            ) : (
              <Button
                component={Link}
                variant='contained'
                href='/pages/login'
                className='whitespace-nowrap'
                sx={{
                  boxShadow: '0px 4px 8px rgba(140, 87, 255, 0.25)',
                  '&:hover': {
                    boxShadow: '0px 6px 12px rgba(140, 87, 255, 0.35)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('common.login')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
