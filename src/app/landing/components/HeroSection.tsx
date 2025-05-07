'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material'
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'
import { useLandingTheme } from '@/theme/LandingThemeProvider'
import styles from '../styles/landing.module.css'

const HeroSection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { mode } = useLandingTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mounted, setMounted] = useState(false)

  // Refs for animation elements
  const heroImageRef = useRef<HTMLDivElement>(null)
  const heroElementsRef = useRef<HTMLDivElement>(null)
  const particlesContainerRef = useRef<HTMLDivElement>(null)

  // Animation refs using intersection observer
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true)

    // Create particles in the background
    if (particlesContainerRef.current) {
      const particleColor = mode === 'light'
        ? 'rgba(140, 87, 255, 0.15)'
        : 'rgba(140, 87, 255, 0.2)'

      // Clear existing particles
      particlesContainerRef.current.innerHTML = ''

      // Create particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')

        // Random position
        const x = Math.random() * 100
        const y = Math.random() * 100

        // Random size
        const size = 2 + Math.random() * 6

        // Random opacity
        const opacity = 0.3 + Math.random() * 0.7

        // Random speed
        const speed = 1.5 * (0.5 + Math.random())

        // Set styles
        particle.style.position = 'absolute'
        particle.style.left = `${x}%`
        particle.style.top = `${y}%`
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.borderRadius = '50%'
        particle.style.backgroundColor = particleColor
        particle.style.opacity = opacity.toString()
        particle.style.animation = `float ${speed}s infinite ease-in-out`

        // Add to container
        particlesContainerRef.current.appendChild(particle)
      }
    }

    // Add animation classes when mounted
    if (titleRef.current) titleRef.current.classList.add(styles.fadeInUp)
    if (subtitleRef.current) subtitleRef.current.classList.add(styles.fadeInUp)
    if (buttonRef.current) buttonRef.current.classList.add(styles.fadeInUp)
  }, [mode])

  // Handle mouse move for parallax effect
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!isMobile) {
      if (heroImageRef.current) {
        const rect = heroImageRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = (event.clientX - centerX) * 0.03
        const distanceY = (event.clientY - centerY) * 0.03

        heroImageRef.current.style.transform = `translate(${distanceX}px, ${distanceY}px)`
      }

      if (heroElementsRef.current) {
        const rect = heroElementsRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = (event.clientX - centerX) * 0.05
        const distanceY = (event.clientY - centerY) * 0.05

        heroElementsRef.current.style.transform = `translate(${distanceX}px, ${distanceY}px)`
      }
    }
  }

  // Handle mouse leave to reset transforms
  const handleMouseLeave = () => {
    if (heroImageRef.current) {
      heroImageRef.current.style.transform = 'none'
      heroImageRef.current.style.transition = 'transform 0.5s ease'
    }

    if (heroElementsRef.current) {
      heroElementsRef.current.style.transform = 'none'
      heroElementsRef.current.style.transition = 'transform 0.5s ease'
    }
  }

  // No longer need theme-based background image as we're using a single optimized image

  return (
    <Box
      component="section"
      id="hero"
      className={styles.heroSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 12, sm: 15, md: 16 },
        pb: { xs: 8, sm: 10, md: 12 },
      }}
    >
      {/* Background Image */}
      <Box
        className={styles.heroBg}
        sx={{
          backgroundImage: mode === 'light'
            ? `url('/images/landing/hero-bg-light.png')`
            : `url('/images/landing/hero-bg-dark.png')`,
          opacity: 0.95,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px)',
          transform: 'scale(1.05)',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Particles Container */}
      <Box
        ref={particlesContainerRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: mode === 'light'
            ? 'linear-gradient(180deg, rgba(244, 245, 250, 0.5) 0%, rgba(244, 245, 250, 0.8) 100%)'
            : 'linear-gradient(180deg, rgba(21, 21, 37, 0.5) 0%, rgba(21, 21, 37, 0.8) 100%)',
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          {/* Left Column - Text Content */}
          <Box sx={{ flex: 1, zIndex: 1, position: 'relative' }}>
            <Fade in={mounted} timeout={1000}>
              <Box className={styles.heroContent}>
                <Typography
                  ref={titleRef}
                  variant="h1"
                  className={styles.heroTitle}
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  {t('landing.hero.title')}
                </Typography>

                <Typography
                  ref={subtitleRef}
                  variant="h5"
                  className={styles.heroSubtitle}
                  sx={{
                    color: 'text.secondary',
                    mb: 5,
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  {t('landing.hero.subtitle')}
                </Typography>

                <Box
                  ref={buttonRef}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                  }}
                >
                  <Button
                    component={Link}
                    href="/pages/register"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={styles.heroButton}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #7C4DFF 0%, #FF5C8D 100%)',
                      boxShadow: theme.shadows[5],
                    }}
                  >
                    {t('landing.getStarted')}
                  </Button>

                  <Button
                    component={Link}
                    href="#features"
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={styles.heroButton}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      borderWidth: '2px',
                      borderColor: theme.palette.primary.main,
                    }}
                  >
                    {t('common.login')}
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Box>

          {/* Right Column - Image */}
          <Box sx={{ flex: 1, zIndex: 1, position: 'relative' }}>
            <Fade in={mounted} timeout={1500}>
              <Box sx={{ position: 'relative', perspective: '1000px' }}>
                {/* Main Image */}
                <Box
                  ref={heroImageRef}
                  className={styles.heroImage}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.5s ease',
                  }}
                >
                  <Box
                    component="img"
                    src={mode === 'light'
                      ? "/images/landing/hero-dashboard-light.png"
                      : "/images/landing/hero-dashboard-dark.png"}
                    alt="E-Learning Platform Interface"
                    sx={{
                      width: '100%',
                      maxWidth: '600px',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: theme.shadows[10],
                      transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                      transition: 'all 0.5s ease',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateY(-8deg) rotateX(8deg)',
                        boxShadow: theme.shadows[20],
                      }
                    }}
                  />
                </Box>

                {/* Floating Elements */}
                <Box
                  ref={heroElementsRef}
                  className={styles.heroElements}
                >
                  {/* Element 1 - Top Left */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-10%',
                      left: '5%',
                      zIndex: 2,
                      animation: 'float 6s infinite ease-in-out',
                    }}
                  >
                    <Box
                      component="img"
                      src={mode === 'light'
                        ? "/images/landing/hero-elements-dark.png"
                        : "/images/landing/hero-elements-dark.png"}
                      alt="Writing Feature"
                      sx={{
                        width: { xs: '60px', sm: '80px', md: '100px' },
                        height: 'auto',
                        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                  </Box>

                  {/* Element 2 - Bottom Right */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '0%',
                      right: '5%',
                      zIndex: 2,
                      animation: 'float 8s infinite ease-in-out',
                      animationDelay: '1s',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/landing/sitting-girl-with-laptop.png"
                      alt="AI Tutor Feature"
                      sx={{
                        width: { xs: '80px', sm: '100px', md: '120px' },
                        height: 'auto',
                        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                  </Box>

                  {/* Element 3 - Top Right */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10%',
                      right: '15%',
                      zIndex: 2,
                      animation: 'float 7s infinite ease-in-out',
                      animationDelay: '0.5s',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/landing/1.png"
                      alt="Learning Feature"
                      sx={{
                        width: { xs: '70px', sm: '90px', md: '110px' },
                        height: 'auto',
                        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                  </Box>

                  {/* Element 4 - Bottom Left */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '20%',
                      left: '15%',
                      zIndex: 2,
                      animation: 'float 9s infinite ease-in-out',
                      animationDelay: '1.5s',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/landing/3.png"
                      alt="Community Feature"
                      sx={{
                        width: { xs: '65px', sm: '85px', md: '105px' },
                        height: 'auto',
                        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Box>
        </Box>
      </Container>

      {/* Floating animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  )
}

export default HeroSection
