'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  Container,
  Button,
  useTheme,
  alpha,
  useMediaQuery
} from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'

const CTASection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        py: { xs: 10, sm: 12, md: 16 },
        overflow: 'hidden'
      }}
    >
      {/* Gradient Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          zIndex: -2,
        }}
      />

      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'url("/images/landing/pattern-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      />

      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: { xs: '100px', sm: '150px', md: '200px' },
          height: { xs: '100px', sm: '150px', md: '200px' },
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.05),
          zIndex: 0,
          animation: 'float 8s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: { xs: '80px', sm: '100px', md: '120px' },
          height: { xs: '80px', sm: '100px', md: '120px' },
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.05),
          zIndex: 0,
          animation: 'float 6s ease-in-out infinite 1s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-15px)' }
          }
        }}
      />

      {/* Small decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '15%',
          width: { xs: '30px', sm: '40px' },
          height: { xs: '30px', sm: '40px' },
          borderRadius: '8px',
          transform: 'rotate(45deg)',
          background: alpha(theme.palette.common.white, 0.07),
          zIndex: 0,
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.07 },
            '50%': { opacity: 0.12 }
          }
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '20%',
          width: { xs: '20px', sm: '30px' },
          height: { xs: '20px', sm: '30px' },
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.1),
          zIndex: 0,
          animation: 'pulse 3s ease-in-out infinite 0.5s'
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
          px: { xs: 2, sm: 4 }
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: { xs: 3, sm: 4 },
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
            lineHeight: 1.2
          }}
        >
          {t('landing.cta.title')}
        </Typography>

        <Typography
          variant="h6"
          paragraph
          sx={{
            mb: { xs: 5, sm: 6 },
            opacity: 0.9,
            maxWidth: '800px',
            mx: 'auto',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
            transitionDelay: '0.1s',
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
            lineHeight: 1.6,
            px: { xs: 1, sm: 2 }
          }}
        >
          {t('landing.cta.subtitle')}
        </Typography>

        <Button
          component={Link}
          href="/pages/register"
          variant="contained"
          color="secondary"
          size="large"
          endIcon={!isMobile && <ArrowForward />}
          sx={{
            px: { xs: 4, sm: 6 },
            py: { xs: 1.25, sm: 1.5 },
            fontSize: { xs: '1rem', sm: '1.1rem' },
            borderRadius: '30px',
            boxShadow: theme.shadows[8],
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme.shadows[12]
            },
            transition: 'all 0.3s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '0.2s'
          }}
        >
          {t('landing.cta.button')}
        </Button>

        <Box
          sx={{
            mt: { xs: 4, sm: 5 },
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.3s'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              px: 2,
              py: 1,
              borderRadius: '20px',
              bgcolor: alpha(theme.palette.common.white, 0.1),
              display: 'inline-block'
            }}
          >
            No credit card required. Start your free trial today.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default CTASection
