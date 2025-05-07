'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Typography,
  Box,
  Container,
  Paper,
  useTheme,
  alpha,
  Avatar
} from '@mui/material'
import { useTranslation } from '@/utils/i18n'

interface StepProps {
  number: number;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, index, isVisible }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        mb: { xs: 6, md: 8 },
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${0.2 + index * 0.2}s`,
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          mb: { xs: 3, md: 0 },
          mr: { xs: 0, md: 4 },
        }}
      >
        <Avatar
          sx={{
            width: { xs: 64, sm: 72, md: 80 },
            height: { xs: 64, sm: 72, md: 80 },
            bgcolor: theme.palette.primary.main,
            color: 'white',
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
            mb: 2,
            border: `4px solid ${alpha(theme.palette.background.paper, 0.8)}`,
          }}
        >
          {number}
        </Avatar>

        {/* Illustration for each step */}
        <Box
          component="img"
          src={`/images/illustrations/characters/${number}.png`}
          alt={`Step ${number} illustration`}
          sx={{
            width: { xs: '120px', sm: '140px', md: '160px' },
            height: 'auto',
            display: { xs: 'none', md: 'block' },
            mt: 2,
            borderRadius: '8px',
            boxShadow: theme.shadows[2],
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          }}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: '16px',
          width: '100%',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
          position: 'relative',
          '&:hover': {
            boxShadow: theme.shadows[6],
            transform: 'translateY(-5px)',
            borderColor: alpha(theme.palette.primary.main, 0.2),
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.5rem' },
            color: theme.palette.primary.main
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            fontSize: { xs: '0.9375rem', sm: '1rem' },
            opacity: 0.85
          }}
        >
          {description}
        </Typography>

        {/* Mobile illustration */}
        <Box
          component="img"
          src={`/images/illustrations/characters/${number}.png`}
          alt={`Step ${number} illustration`}
          sx={{
            width: '100%',
            height: 'auto',
            display: { xs: 'block', md: 'none' },
            mt: 3,
            borderRadius: '8px',
            boxShadow: theme.shadows[2],
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          }}
        />
      </Paper>

      {index < 2 && (
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 32, md: 40 },
            top: { xs: 80, md: '50%' },
            bottom: { xs: -24, md: 'auto' },
            width: { xs: 2, md: 0 },
            height: { xs: 'auto', md: 0 },
            borderLeft: { xs: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`, md: 'none' },
            borderTop: { xs: 'none', md: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}` },
            transform: { xs: 'none', md: 'translateY(36px)' },
            zIndex: 1,
            display: { xs: 'block', md: 'none' }
          }}
        />
      )}
    </Box>
  )
}

const HowItWorksSection: React.FC = () => {
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

  // Steps data
  const steps = [
    {
      number: 1,
      title: t('landing.howItWorks.step1.title'),
      description: t('landing.howItWorks.step1.description')
    },
    {
      number: 2,
      title: t('landing.howItWorks.step2.title'),
      description: t('landing.howItWorks.step2.description')
    },
    {
      number: 3,
      title: t('landing.howItWorks.step3.title'),
      description: t('landing.howItWorks.step3.description')
    }
  ]

  return (
    <Box
      ref={sectionRef}
      id="how-it-works"
      sx={{
        py: { xs: 10, sm: 12, md: 16 },
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
          top: '15%',
          right: '10%',
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
          bottom: '10%',
          left: '5%',
          width: { xs: '150px', md: '250px' },
          height: { xs: '150px', md: '250px' },
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.04),
          filter: 'blur(50px)',
          opacity: 0.6,
          zIndex: 0
        }}
      />

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '20%',
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
          top: '40%',
          left: '15%',
          width: { xs: '25px', md: '40px' },
          height: { xs: '25px', md: '40px' },
          borderRadius: '8px',
          transform: 'rotate(15deg)',
          background: alpha(theme.palette.success.main, 0.07),
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: { xs: '20px', md: '30px' },
          height: { xs: '20px', md: '30px' },
          borderRadius: '50%',
          background: alpha(theme.palette.error.main, 0.05),
          zIndex: 0
        }}
      />

      <Container
        maxWidth="md"
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
            {t('landing.howItWorksSection.title')}
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
            {t('landing.howItWorksSection.subtitle')}
          </Typography>
        </Box>

        <Box>
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </Box>

        {/* Illustration */}
        <Box
          sx={{
            mt: { xs: 8, md: 10 },
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
            transitionDelay: '0.8s',
            position: 'relative'
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: '16px',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: 'blur(10px)',
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                boxShadow: theme.shadows[8],
                transform: 'translateY(-5px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Box
              component="img"
              src="/images/front-pages/landing-page/hero-dashboard-dark.png"
              alt="Platform interface showcase"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: theme.shadows[2],
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              }}
            />

            {/* Play button overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '60px', sm: '70px', md: '80px' },
                height: { xs: '60px', sm: '70px', md: '80px' },
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.9),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: theme.shadows[8],
                '&:hover': {
                  bgcolor: theme.palette.primary.main,
                  transform: 'translate(-50%, -50%) scale(1.1)',
                },
                transition: 'all 0.3s ease',
                zIndex: 2
              }}
            >
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderTop: { xs: '10px solid transparent', sm: '12px solid transparent', md: '15px solid transparent' },
                  borderBottom: { xs: '10px solid transparent', sm: '12px solid transparent', md: '15px solid transparent' },
                  borderLeft: { xs: '18px solid white', sm: '20px solid white', md: '25px solid white' },
                  ml: { xs: 2, sm: 3 }
                }}
              />
            </Box>
          </Paper>

          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: { xs: '100px', md: '150px' },
              height: { xs: '100px', md: '150px' },
              borderRadius: '50%',
              background: alpha(theme.palette.primary.main, 0.03),
              filter: 'blur(30px)',
              zIndex: -1
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: { xs: '120px', md: '180px' },
              height: { xs: '120px', md: '180px' },
              borderRadius: '50%',
              background: alpha(theme.palette.secondary.main, 0.04),
              filter: 'blur(40px)',
              zIndex: -1
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default HowItWorksSection
