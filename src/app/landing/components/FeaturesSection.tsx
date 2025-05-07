'use client'

import React, { useEffect, useRef, useState, ReactElement } from 'react'
import {
  Typography,
  Box,
  Container,
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
import { useLandingTheme } from '@/theme/LandingThemeProvider'
import styles from '../styles/landing.module.css'

interface FeatureCardProps {
  icon: ReactElement<SvgIconProps>;
  title: string;
  description: string;
  index: number;
  iconColor?: string;
  imagePath?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index, iconColor, imagePath }) => {
  const theme = useTheme()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Handle intersection observer for animation on scroll
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

    // Store the current ref value to use in cleanup
    const currentRef = cardRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [])

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setRotation({ x: rotateX, y: rotateY })
  }

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  // Set hovered state when mouse enters
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Get gradient background based on icon color
  const getGradientBackground = () => {
    const color = iconColor || theme.palette.primary.main
    return `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`
  }

  return (
    <Paper
      ref={cardRef}
      elevation={3} // Increased elevation for better visibility
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="feature-card"
      sx={{
        width: '100%', // Ensure full width
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: isVisible
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(0)`
          : 'translateY(30px)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        position: 'relative',
        overflow: 'visible',
        borderRadius: '16px',
        border: `1px solid ${alpha(theme.palette.divider, 0.15)}`, // More visible border
        background: alpha(theme.palette.background.paper, 0.8), // More opaque background
        backdropFilter: 'blur(8px)',
        p: { xs: 3, sm: 4 },
        transformStyle: 'preserve-3d',
        boxShadow: `0 10px 20px ${alpha(theme.palette.common.black, 0.1)}`, // Default shadow
        '&:hover': {
          boxShadow: `0 20px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-10px)`,
          '& .feature-icon-wrapper': {
            transform: 'translateZ(30px) scale(1.1)',
            boxShadow: `0 15px 25px ${alpha(iconColor || theme.palette.primary.main, 0.3)}`,
          },
          '& .feature-title': {
            transform: 'translateZ(20px)',
            background: getGradientBackground(),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
          '& .feature-description': {
            transform: 'translateZ(10px)',
          }
        }
      }}
    >
      {/* Glowing background effect when hovered */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '16px',
          background: getGradientBackground(),
          transition: 'opacity 0.4s ease',
          filter: 'blur(20px)',
          transform: 'translateZ(-5px)',
          opacity: isHovered ? 0.1 : 0,
          zIndex: -1,
        }}
      />

      {imagePath ? (
        <Box
          className="feature-icon-wrapper"
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100px', sm: '120px', md: '140px' },
            height: { xs: '100px', sm: '120px', md: '140px' },
            borderRadius: '50%', // Circular shape
            transition: 'all 0.4s ease',
            transform: 'translateZ(20px)',
            background: alpha(iconColor || theme.palette.primary.main, 0.05),
            padding: 0, // Remove padding to allow image to fill
            border: `2px solid ${alpha(iconColor || theme.palette.primary.main, 0.2)}`,
            boxShadow: `0 10px 20px ${alpha(iconColor || theme.palette.primary.main, 0.15)}`,
            overflow: 'hidden', // Ensure image stays within the circle
            position: 'relative', // For absolute positioning of the image
          }}
        >
          <Box
            component="img"
            src={imagePath}
            alt={title}
            className="feature-image"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Fill the circle
              borderRadius: '50%', // Ensure image is circular
              filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.25))',
              transition: 'all 0.5s ease',
            }}
          />
        </Box>
      ) : (
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
            background: getGradientBackground(),
            color: '#fff',
            transition: 'all 0.4s ease',
            boxShadow: `0 8px 16px ${alpha(iconColor || theme.palette.primary.main, 0.25)}`,
            transform: 'translateZ(20px)',
          }}
        >
          {React.cloneElement(icon, {
            sx: {
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))',
            }
          })}
        </Box>
      )}

      <Typography
        variant="h6"
        component="h3"
        className="feature-title"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
          color: 'text.primary',
          transition: 'all 0.4s ease',
          transform: 'translateZ(15px)',
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        className="feature-description"
        sx={{
          lineHeight: 1.7,
          fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
          opacity: 0.85,
          px: { xs: 0.5, sm: 1 },
          transition: 'all 0.4s ease',
          transform: 'translateZ(10px)',
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
  imagePath?: string;
}

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { mode } = useLandingTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const particlesContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Handle intersection observer for animation on scroll
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

    // Store the current ref value to use in cleanup
    const currentRef = sectionRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [])

  // Create particles effect
  useEffect(() => {
    if (!particlesContainerRef.current) return

    const container = particlesContainerRef.current
    const particleColor = mode === 'light'
      ? 'rgba(140, 87, 255, 0.08)'
      : 'rgba(140, 87, 255, 0.12)'

    // Clear existing particles
    container.innerHTML = ''

    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')

      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100

      // Random size
      const size = 2 + Math.random() * 8

      // Random opacity
      const opacity = 0.2 + Math.random() * 0.4

      // Random speed
      const speed = 20 + Math.random() * 40

      // Set styles
      particle.style.position = 'absolute'
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '30%'
      particle.style.backgroundColor = particleColor
      particle.style.opacity = opacity.toString()
      particle.style.animation = `float ${speed}s infinite linear`
      particle.style.transform = `rotate(${Math.random() * 360}deg)`

      // Add to container
      container.appendChild(particle)
    }
  }, [mode])

  // Add animation classes when section becomes visible
  useEffect(() => {
    if (isVisible) {
      if (titleRef.current) titleRef.current.classList.add(styles.fadeInUp)
      if (subtitleRef.current) subtitleRef.current.classList.add(styles.fadeInUp)
    }
  }, [isVisible])

  // Features data with custom colors and image paths
  const features: FeatureItem[] = [
    {
      icon: <AutoStories />,
      title: t('landing.features.writingTools.title'),
      description: t('landing.features.writingTools.description'),
      iconColor: '#FF5C8D', // Pink
      imagePath: '/images/front-pages/landing-page/chat.png'
    },
    {
      icon: <Quiz />,
      title: t('landing.features.adaptiveTest.title'),
      description: t('landing.features.adaptiveTest.description'),
      iconColor: '#7C4DFF', // Purple
      imagePath: '/images/front-pages/landing-page/sitting-girl-with-laptop.png'
    },
    {
      icon: <Chat />,
      title: t('landing.features.aiTutor.title'),
      description: t('landing.features.aiTutor.description'),
      iconColor: '#00BFA5', // Teal
      imagePath: '/images/front-pages/landing-page/nannie.png'
    },
    {
      icon: <Language />,
      title: t('landing.features.vietnamese.title'),
      description: t('landing.features.vietnamese.description'),
      iconColor: '#FF9100', // Orange
      imagePath: '/images/front-pages/landing-page/paul.png'
    },
    {
      icon: <School />,
      title: t('landing.features.structured.title'),
      description: t('landing.features.structured.description'),
      iconColor: '#2979FF', // Blue
      imagePath: '/images/front-pages/landing-page/sophie.png'
    },
    {
      icon: <TrendingUp />,
      title: t('landing.features.progress.title'),
      description: t('landing.features.progress.description'),
      iconColor: '#F50057', // Pink/Red
      imagePath: '/images/front-pages/landing-page/chris.png'
    }
  ]

  return (
    <Box
      ref={sectionRef}
      id="features"
      className={styles.sectionPadding}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: mode === 'light'
          ? 'linear-gradient(180deg, #F4F5FA 0%, #FFFFFF 100%)'
          : 'linear-gradient(180deg, #151525 0%, #1E1E35 100%)',
        minHeight: '100vh', // Ensure section has minimum height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Particles Container */}
      <Box
        ref={particlesContainerRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 90% 80%, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />

      {/* 3D Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: { xs: '40px', md: '60px' },
          height: { xs: '40px', md: '60px' },
          borderRadius: '12px',
          transform: 'rotate(25deg) translateZ(20px)',
          background: 'linear-gradient(135deg, #7C4DFF 0%, #9D6EFF 100%)',
          opacity: 0.1,
          boxShadow: theme.shadows[5],
          animation: 'float 15s infinite ease-in-out',
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: { xs: '30px', md: '50px' },
          height: { xs: '30px', md: '50px' },
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF9100 0%, #FFAB40 100%)',
          opacity: 0.1,
          boxShadow: theme.shadows[4],
          animation: 'float 20s infinite ease-in-out',
          animationDelay: '2s',
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '15%',
          width: { xs: '35px', md: '45px' },
          height: { xs: '35px', md: '45px' },
          borderRadius: '12px',
          transform: 'rotate(-15deg)',
          background: 'linear-gradient(135deg, #2979FF 0%, #5393FF 100%)',
          opacity: 0.1,
          boxShadow: theme.shadows[5],
          animation: 'float 18s infinite ease-in-out',
          animationDelay: '1s',
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: { xs: '25px', md: '35px' },
          height: { xs: '25px', md: '35px' },
          borderRadius: '8px',
          transform: 'rotate(45deg)',
          background: 'linear-gradient(135deg, #00BFA5 0%, #1DE9B6 100%)',
          opacity: 0.1,
          boxShadow: theme.shadows[3],
          animation: 'float 12s infinite ease-in-out',
          animationDelay: '0.5s',
          zIndex: 0
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 }, // Add horizontal padding
        }}
      >
        <Box className={styles.sectionTitle}>
          <Typography
            ref={titleRef}
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #7C4DFF 0%, #FF5C8D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 1,
            }}
          >
            {t('landing.featuresSection.title')}
          </Typography>

          <Box className={styles.sectionTitleLine} />

          <Typography
            ref={subtitleRef}
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mt: 4,
              mb: 8,
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            {t('landing.featuresSection.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.2s',
            perspective: '1000px',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: { xs: 4, sm: 5, md: 6 },
              width: '100%',
              transformStyle: 'preserve-3d',
              mx: 'auto', // Center the grid
              maxWidth: '1200px', // Limit maximum width
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${10 * (index % 3)}px)`,
                  height: '100%', // Ensure consistent height
                }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  iconColor={feature.iconColor}
                  imagePath={feature.imagePath}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Floating animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(15px) rotate(-5deg);
          }
        }
      `}</style>
    </Box>
  )
}

export default FeaturesSection
