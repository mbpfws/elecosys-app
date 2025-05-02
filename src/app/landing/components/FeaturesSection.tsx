'use client'

import React, { useEffect, useRef, useState, ReactElement } from 'react'
import {
  Typography,
  Box,
  Container,
  Grid,
  useTheme,
  alpha,
  SvgIconProps,
  Paper
} from '@mui/material'
import {
  School,
  AutoStories,
  Quiz,
  Chat,
  Language,
  TrendingUp
} from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'

interface FeatureCardProps {
  icon: ReactElement<SvgIconProps>;
  title: string;
  description: string;
  index: number;
  iconColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index, iconColor }) => {
  const theme = useTheme()
  const cardRef = useRef<HTMLDivElement>(null)
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

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <Paper
      ref={cardRef}
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        position: 'relative',
        overflow: 'visible',
        borderRadius: '16px',
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        background: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(8px)',
        p: { xs: 3, sm: 4 },
        '&:hover': {
          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
          transform: 'translateY(-5px)',
          '& .feature-icon-wrapper': {
            transform: 'translateY(-8px) scale(1.05)',
            boxShadow: `0 12px 20px ${alpha(iconColor || theme.palette.primary.main, 0.25)}`,
          }
        }
      }}
    >
      <Box
        className="feature-icon-wrapper"
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: { xs: '60px', sm: '70px', md: '80px' },
          height: { xs: '60px', sm: '70px', md: '80px' },
          borderRadius: '20px',
          background: iconColor || theme.palette.primary.main,
          color: '#fff',
          transition: 'all 0.4s ease',
          boxShadow: `0 8px 16px ${alpha(iconColor || theme.palette.primary.main, 0.25)}`,
        }}
      >
        {React.cloneElement(icon, {
          sx: { fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } }
        })}
      </Box>

      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
          color: 'text.primary'
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          lineHeight: 1.7,
          fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
          opacity: 0.85,
          px: { xs: 0.5, sm: 1 }
        }}
      >
        {description}
      </Typography>
    </Paper>
  )
}

interface FeatureItem {
  icon: ReactElement<SvgIconProps>;
  title: string;
  description: string;
  iconColor?: string;
}

const FeaturesSection: React.FC = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  // Features data with custom colors
  const features: FeatureItem[] = [
    {
      icon: <AutoStories />,
      title: t('landing.features.writingTools.title'),
      description: t('landing.features.writingTools.description'),
      iconColor: '#FF5C8D' // Pink
    },
    {
      icon: <Quiz />,
      title: t('landing.features.adaptiveTest.title'),
      description: t('landing.features.adaptiveTest.description'),
      iconColor: '#7C4DFF' // Purple
    },
    {
      icon: <Chat />,
      title: t('landing.features.aiTutor.title'),
      description: t('landing.features.aiTutor.description'),
      iconColor: '#00BFA5' // Teal
    },
    {
      icon: <Language />,
      title: t('landing.features.vietnamese.title'),
      description: t('landing.features.vietnamese.description'),
      iconColor: '#FF9100' // Orange
    },
    {
      icon: <School />,
      title: t('landing.features.structured.title'),
      description: t('landing.features.structured.description'),
      iconColor: '#2979FF' // Blue
    },
    {
      icon: <TrendingUp />,
      title: t('landing.features.progress.title'),
      description: t('landing.features.progress.description'),
      iconColor: '#F50057' // Pink/Red
    }
  ]

  return (
    <Box
      ref={sectionRef}
      id="features"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        background: theme.palette.background.default,
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
          background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.5)} 0%, ${alpha(theme.palette.background.paper, 0.5)} 100%)`,
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '0',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '0',
          width: '60%',
          height: '60%',
          background: `radial-gradient(circle at 90% 60%, ${alpha(theme.palette.secondary.main, 0.04)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: { xs: '30px', md: '40px' },
          height: { xs: '30px', md: '40px' },
          borderRadius: '8px',
          transform: 'rotate(25deg)',
          background: alpha(theme.palette.primary.main, 0.06),
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: { xs: '20px', md: '30px' },
          height: { xs: '20px', md: '30px' },
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.08),
          zIndex: 0
        }}
      />

      {/* Additional decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '15%',
          width: { xs: '25px', md: '35px' },
          height: { xs: '25px', md: '35px' },
          borderRadius: '12px',
          transform: 'rotate(-15deg)',
          background: alpha(theme.palette.error.main, 0.05),
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: { xs: '15px', md: '25px' },
          height: { xs: '15px', md: '25px' },
          borderRadius: '6px',
          transform: 'rotate(45deg)',
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
            mb: { xs: 6, md: 8 },
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
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              position: 'relative',
              display: 'inline-block',
              mb: 2,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '50px', sm: '60px' },
                height: '3px',
                background: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}
          >
            {t('landing.featuresSection.title')}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              mt: 4,
              fontWeight: 'normal',
              fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              opacity: 0.85
            }}
          >
            {t('landing.featuresSection.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.2s'
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: { xs: 3, sm: 4, md: 5 },
              width: '100%'
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  iconColor={feature.iconColor}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default FeaturesSection
