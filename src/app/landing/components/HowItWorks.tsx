'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Typography, 
  Box, 
  Container, 
  Grid, 
  useTheme,
  alpha,
  Paper
} from '@mui/material'
import { 
  PersonAdd, 
  Psychology, 
  Analytics 
} from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'

const StepItem = ({ icon, title, description, index, isVisible }) => {
  const theme = useTheme()
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'flex-start',
        mb: 6,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${index * 0.2}s`,
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: theme.palette.primary.main,
          color: 'white',
          mr: 3,
          flexShrink: 0,
          boxShadow: theme.shadows[3]
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.primary.main,
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: theme.palette.text.secondary,
            lineHeight: 1.7
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

const HowItWorks = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const sectionRef = useRef(null)
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

  const steps = [
    {
      icon: <PersonAdd fontSize="medium" />,
      title: t('landing.howItWorks.step1.title'),
      description: t('landing.howItWorks.step1.description')
    },
    {
      icon: <Psychology fontSize="medium" />,
      title: t('landing.howItWorks.step2.title'),
      description: t('landing.howItWorks.step2.description')
    },
    {
      icon: <Analytics fontSize="medium" />,
      title: t('landing.howItWorks.step3.title'),
      description: t('landing.howItWorks.step3.description')
    }
  ]

  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        py: { xs: 8, md: 12 },
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
          right: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.background.default, 0)} 50%)`,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}
          >
            {t('landing.howItWorks.title')}
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              mt: 3,
              fontWeight: 'normal'
            }}
          >
            {t('landing.howItWorks.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {steps.map((step, index) => (
                <StepItem 
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.8s ease',
                transitionDelay: '0.3s',
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.1)',
                    zIndex: 1
                  }
                }}
              >
                <Box 
                  component="img"
                  src="/images/landing/platform-interface.jpg"
                  alt="Platform Interface"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.9),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: theme.shadows[5],
                    '&:hover': {
                      background: theme.palette.primary.main,
                      transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box
                    component="i"
                    className="ri-play-fill"
                    sx={{
                      color: 'white',
                      fontSize: '2rem',
                      marginLeft: '5px'
                    }}
                  />
                </Box>
              </Paper>
              <Box
                sx={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: alpha(theme.palette.secondary.main, 0.1),
                  zIndex: -1
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: '-30px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: alpha(theme.palette.primary.main, 0.1),
                  zIndex: -1
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HowItWorks
