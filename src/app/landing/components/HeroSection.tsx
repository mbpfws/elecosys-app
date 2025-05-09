'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import Image from 'next/image'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { useTranslation } from '@/utils/i18n'
import { useLandingTheme } from '@/theme/LandingThemeProvider'

// Styles Imports
import styles from '../styles/landing.module.css'
import frontCommonStyles from '../styles/frontCommon.module.css'

const HeroSection = () => {
  // States
  const [dashboardPosition, setDashboardPosition] = useState({ x: 0, y: 0 })
  const [elementsPosition, setElementsPosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Hooks
  const { t } = useTranslation()
  const { mode } = useLandingTheme()
  const isAboveLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  // Vars
  // Use images from the landing directory
  const dashboardImage = mode === 'light'
    ? '/images/landing/hero-dashboard-light.png'
    : '/images/landing/hero-dashboard-dark.png'
  const elementsImage = mode === 'light'
    ? '/images/landing/hero-elements-light.png'
    : '/images/landing/hero-elements-dark.png'
  const heroSectionBg = mode === 'light'
    ? '/images/landing/hero-bg-light.png'
    : '/images/landing/hero-bg-dark.png'

  useEffect(() => {
    // Set loaded state after component mounts to trigger animations
    setIsLoaded(true)

    if (typeof window !== 'undefined') {
      const speedDashboard = 2
      const speedElements = 2.5

      const updateMousePosition = (ev: MouseEvent) => {
        const x = ev.clientX
        const y = ev.clientY

        setDashboardPosition({
          x: (window.innerWidth - x * speedDashboard) / 100,
          y: Math.max((window.innerHeight - y * speedDashboard) / 100, -40)
        })

        setElementsPosition({
          x: (window.innerWidth - x * speedElements) / 100,
          y: Math.max((window.innerHeight - y * speedElements) / 100, -40)
        })
      }

      window.addEventListener('mousemove', updateMousePosition)

      return () => {
        window.removeEventListener('mousemove', updateMousePosition)
      }
    }
  }, [])

  return (
    <section id='home' className='relative overflow-hidden pbs-[70px] -mbs-[70px] bg-backgroundPaper z-[1]'>
      <Box className={styles.heroSectionBg} position="absolute">
        <Image
          src={heroSectionBg}
          alt='hero-bg'
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <div className={classnames('pbs-16 overflow-hidden', frontCommonStyles.layoutSpacing)}>
        <div className='md:max-is-[550px] mlb-0 mli-auto text-center'>
          <Typography
            className={classnames('font-extrabold text-primary sm:text-[38px] text-3xl mbe-4 leading-[44px]', isLoaded && styles.fadeInUp)}
            sx={{ '--animation-delay': '0.2s' }}
          >
            {t('landing.hero.title')}
          </Typography>
          <Typography
            className={classnames('font-medium', isLoaded && styles.fadeInUp)}
            color='text.primary'
            sx={{ '--animation-delay': '0.4s' }}
          >
            {t('landing.hero.subtitle')}
          </Typography>
          <Box
            className={classnames('mbs-8', isLoaded && styles.fadeInUp)}
            sx={{ '--animation-delay': '0.6s' }}
          >
            <Button
              component={Link}
              href='/pages/register'
              variant='contained'
              color='primary'
              size='large'
              sx={{
                boxShadow: (theme) => `0px 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
                '&:hover': {
                  boxShadow: (theme) => `0px 6px 12px ${alpha(theme.palette.primary.main, 0.35)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                fontWeight: 600,
                px: 4,
                py: 1.5
              }}
            >
              {t('landing.getStarted')}
            </Button>
          </Box>
        </div>
      </div>
      <Box
        className={classnames('relative text-center', frontCommonStyles.layoutSpacing)}
        sx={{
          transform: isAboveLgScreen ? `translate(${dashboardPosition.x}px, ${dashboardPosition.y}px)` : 'none',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Link href='/' target='_blank'>
          <Box className={classnames('mli-auto relative', styles.heroSecDashboard)}>
            <Image
              src={dashboardImage}
              alt='dashboard-image'
              width={1200}
              height={675}
              priority
              className={isLoaded ? styles.fadeIn : ''}
              style={{
                filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))',
                width: '100%',
                height: 'auto'
              }}
            />
            <Box className={classnames('absolute', styles.heroSectionElements)}>
              <Image
                src={elementsImage}
                alt='dashboard-elements'
                width={800}
                height={450}
                className={isLoaded ? styles.fadeInRight : ''}
                style={{
                  transform: isAboveLgScreen ? `translate(${elementsPosition.x}px, ${elementsPosition.y}px)` : 'none',
                  transition: 'transform 0.1s ease-out',
                  width: '100%',
                  height: 'auto'
                }}
              />
            </Box>
          </Box>
        </Link>
      </Box>
    </section>
  )
}

export default HeroSection
