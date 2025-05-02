'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Typography, 
  Button, 
  Box, 
  Container, 
  useMediaQuery,
  useTheme,
  alpha
} from '@mui/material'
import { useTranslation } from '@/utils/i18n'

const HeroSection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mounted, setMounted] = useState(false)

  // Animation effect for dashboard image
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Box 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
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
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.dark, 0.95)} 100%)`,
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

      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 8, md: 4 },
          }}
        >
          {/* Hero Content */}
          <Box 
            sx={{ 
              flex: '1',
              color: 'white',
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { md: '500px' }
            }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                mb: 3
              }}
            >
              {t('landing.hero.title')}
            </Typography>
            
            <Typography 
              variant="h5" 
              paragraph 
              sx={{ 
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 'normal'
              }}
            >
              {t('landing.hero.subtitle')}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}
            >
              <Button 
                component={Link} 
                href="/pages/register" 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows[8],
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {t('landing.hero.cta')}
              </Button>
              
              <Button 
                component={Link} 
                href="/pages/login" 
                variant="outlined" 
                color="inherit" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {t('common.login')}
              </Button>
            </Box>
          </Box>

          {/* Hero Image */}
          <Box 
            sx={{ 
              flex: '1',
              position: 'relative',
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              opacity: mounted ? 1 : 0,
              transition: 'all 0.6s ease-out',
              maxWidth: { xs: '100%', md: '600px' },
              width: '100%'
            }}
          >
            <Box 
              sx={{ 
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '5%',
                  left: '5%',
                  width: '90%',
                  height: '90%',
                  borderRadius: '10px',
                  background: alpha(theme.palette.common.white, 0.1),
                  backdropFilter: 'blur(10px)',
                  zIndex: -1,
                  transform: 'rotate(-3deg)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <Box 
                component="img"
                src="/images/landing/platform-interface.jpg"
                alt="IELTS Learning Platform Interface"
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: theme.shadows[10],
                  transform: 'rotate(2deg)',
                }}
              />
            </Box>

            {/* Floating Elements */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: alpha(theme.palette.secondary.main, 0.2),
                backdropFilter: 'blur(5px)',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' },
                  '100%': { transform: 'translateY(0px)' }
                }
              }}
            />
            
            <Box 
              sx={{ 
                position: 'absolute',
                bottom: '-5%',
                left: '-10%',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: alpha(theme.palette.primary.light, 0.3),
                backdropFilter: 'blur(5px)',
                animation: 'float 8s ease-in-out infinite 1s',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' },
                  '100%': { transform: 'translateY(0px)' }
                }
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
