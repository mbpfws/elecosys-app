'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Typography,
  Box,
  Container,
  Paper,
  useTheme,
  alpha,
  Grid
} from '@mui/material'
import { useTranslation } from '@/utils/i18n'
// We'll implement our own simple counter

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  index: number;
  isVisible: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix = '', index, isVisible }) => {
  const theme = useTheme()
  const [count, setCount] = useState(0)

  // Simple counter effect
  useEffect(() => {
    if (!isVisible) return

    // Start counter from 0
    const duration = 2000 // 2 seconds
    const frameDuration = 1000 / 60 // 60fps
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const counter = setInterval(() => {
      frame++
      // Use easeOutQuad for smoother animation
      const progress = frame / totalFrames
      const easeProgress = 1 - Math.pow(1 - progress, 2)
      const currentCount = Math.floor(easeProgress * value)

      setCount(currentCount)

      if (frame === totalFrames) {
        clearInterval(counter)
        setCount(value)
      }
    }, frameDuration)

    return () => clearInterval(counter)
  }, [isVisible, value])

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Paper
      elevation={0}
      sx={{
        py: { xs: 5, md: 6 },
        px: { xs: 4, md: 5 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '20px',
        background: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(15px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: theme.shadows[3],
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${0.2 + index * 0.1}s`,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: theme.shadows[8],
          transform: 'translateY(-8px)',
          borderColor: alpha(theme.palette.primary.main, 0.2),
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          opacity: 0.8
        }
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 2,
          fontSize: { xs: '2.75rem', sm: '3.25rem', md: '3.75rem' },
          lineHeight: 1.1,
          display: 'flex',
          alignItems: 'center',
          textShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        {isVisible ? (
          <span>{formatNumber(count)}{suffix}</span>
        ) : (
          <span>0{suffix}</span>
        )}
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          fontSize: { xs: '1.0625rem', sm: '1.125rem', md: '1.25rem' },
          opacity: 0.9,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}
      >
        {label}
      </Typography>
    </Paper>
  )
}

const StatsSection: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Stats data
  const stats = [
    {
      value: 10000,
      label: t('landing.stats.users'),
      suffix: '+'
    },
    {
      value: 87,
      label: t('landing.stats.satisfaction'),
      suffix: '%'
    },
    {
      value: 14,
      label: t('landing.stats.improvement'),
      suffix: '%'
    },
    {
      value: 24,
      label: t('landing.stats.countries'),
      suffix: ''
    }
  ]

  return (
    <Box
      ref={sectionRef}
      id="our-impact"
      sx={{
        py: { xs: 10, sm: 12, md: 16 },
        background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: { xs: '200px', md: '300px' },
          height: { xs: '200px', md: '300px' },
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.03),
          filter: 'blur(60px)',
          opacity: 0.5,
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: { xs: '150px', md: '250px' },
          height: { xs: '150px', md: '250px' },
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.04),
          filter: 'blur(50px)',
          opacity: 0.6,
          zIndex: 0
        }}
      />

      {/* Additional decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: { xs: '30px', md: '50px' },
          height: { xs: '30px', md: '50px' },
          borderRadius: '12px',
          transform: 'rotate(45deg)',
          background: alpha(theme.palette.primary.main, 0.06),
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: { xs: '25px', md: '40px' },
          height: { xs: '25px', md: '40px' },
          borderRadius: '8px',
          transform: 'rotate(15deg)',
          background: alpha(theme.palette.success.main, 0.07),
          zIndex: 0
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 3 }
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 8, md: 10 },
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease'
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              position: 'relative',
              display: 'inline-block',
              mb: 4,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '60px', sm: '80px' },
                height: '4px',
                background: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}
          >
            {t('landing.statsSection.title')}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mt: 5,
              fontWeight: 'normal',
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6,
              opacity: 0.85
            }}
          >
            {t('landing.statsSection.subtitle')}
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
        >
          {stats.map((stat, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <StatItem
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                index={index}
                isVisible={isVisible}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: { xs: 10, md: 14 },
            p: { xs: 0, sm: 0, md: 0 },
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
            transitionDelay: '0.6s'
          }}
        >
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid
              size={{ xs: 12, md: 6 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: theme.shadows[10],
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                  }
                }}
              >
                <Box
                  component="img"
                  src="/images/front-pages/landing-page/hero-elements-dark.png"
                  alt="Our impact illustration"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                />

                {/* Overlay gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`,
                    zIndex: 1
                  }}
                />

                {/* Decorative elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.1),
                    filter: 'blur(30px)',
                    zIndex: 0
                  }}
                />
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 6 }}
            >
              <Box
                sx={{
                  p: { xs: 4, sm: 5, md: 6 },
                  borderRadius: '20px',
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(15px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: theme.shadows[4],
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '6px',
                    height: '100%',
                    background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0.8
                  }
                }}
              >
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    mb: 4,
                    fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
                    color: theme.palette.primary.main,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      width: '60px',
                      height: '4px',
                      background: theme.palette.primary.main,
                      borderRadius: '2px'
                    }
                  }}
                >
                  {t('landing.statsSection.impactTitle')}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    fontSize: { xs: '1.0625rem', md: '1.125rem' },
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    fontWeight: 400
                  }}
                >
                  {t('landing.statsSection.impactDescription1')}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1.0625rem', md: '1.125rem' },
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    fontWeight: 400
                  }}
                >
                  {t('landing.statsSection.impactDescription2')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default StatsSection
