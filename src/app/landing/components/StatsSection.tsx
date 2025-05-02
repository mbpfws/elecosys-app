'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  useTheme,
  alpha,
  useMediaQuery,
  Divider
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

    let start = 0
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
        py: { xs: 4, md: 5 },
        px: { xs: 3, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '16px',
        background: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${0.2 + index * 0.1}s`,
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-5px)',
          borderColor: alpha(theme.palette.primary.main, 0.3),
        }
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 1,
          fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
          lineHeight: 1.2,
          display: 'flex',
          alignItems: 'center'
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
          fontWeight: 'medium',
          fontSize: { xs: '1rem', sm: '1.125rem' },
          opacity: 0.85
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
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
              {...{
                item: true,
                xs: 12,
                sm: 6,
                md: 3
              }}
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
            mt: { xs: 8, md: 12 },
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: '16px',
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            boxShadow: theme.shadows[2],
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
            transitionDelay: '0.6s'
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid
              {...{
                item: true,
                xs: 12,
                md: 6
              }}
            >
              <Box
                component="img"
                src="/images/landing/impact-illustration.png"
                alt="Our impact illustration"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: theme.shadows[3],
                }}
              />
            </Grid>

            <Grid
              {...{
                item: true,
                xs: 12,
                md: 6
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                }}
              >
                {t('landing.statsSection.impactTitle')}
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  mb: 3,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.7,
                  color: 'text.secondary'
                }}
              >
                {t('landing.statsSection.impactDescription1')}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.7,
                  color: 'text.secondary'
                }}
              >
                {t('landing.statsSection.impactDescription2')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default StatsSection
