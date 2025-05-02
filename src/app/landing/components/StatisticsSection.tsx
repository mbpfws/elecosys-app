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
import { useTranslation } from '@/utils/i18n'

const StatItem = ({ icon, value, label, isVisible, delay }) => {
  const theme = useTheme()
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (isVisible) {
      const duration = 2000 // ms
      const increment = value / (duration / 16) // 60fps
      let currentCount = 0
      
      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [isVisible, value])
  
  return (
    <Paper
      elevation={0}
      sx={{ 
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '16px',
        background: alpha(theme.palette.primary.main, 0.03),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${delay}s`,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          background: alpha(theme.palette.primary.main, 0.05),
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[2]
        }
      }}
    >
      <Box 
        sx={{ 
          color: theme.palette.primary.main,
          fontSize: '2.5rem',
          mb: 2
        }}
      >
        {icon}
      </Box>
      <Typography 
        variant="h3" 
        component="div" 
        sx={{ 
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 1
        }}
      >
        {count}
        {label === 'Success Rate' && '%'}
        {label === 'Average Score Improvement' && '+'}
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ fontWeight: 'medium' }}
      >
        {label}
      </Typography>
      
      {/* Background Element */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.05),
          zIndex: 0
        }}
      />
    </Paper>
  )
}

const StatisticsSection = () => {
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

  // Statistics data
  const statistics = [
    {
      icon: <i className="ri-user-line" />,
      value: 5000,
      label: "Active Students"
    },
    {
      icon: <i className="ri-file-list-line" />,
      value: 93,
      label: "Success Rate"
    },
    {
      icon: <i className="ri-bar-chart-line" />,
      value: 1,
      label: "Average Score Improvement"
    },
    {
      icon: <i className="ri-time-line" />,
      value: 24,
      label: "Hours of Practice"
    }
  ]

  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        py: { xs: 8, md: 12 },
        background: theme.palette.background.paper,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'url("/images/landing/pattern-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
            Our Impact
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
            See how our platform is helping students achieve their IELTS goals
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {statistics.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <StatItem 
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                isVisible={isVisible}
                delay={index * 0.1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default StatisticsSection
