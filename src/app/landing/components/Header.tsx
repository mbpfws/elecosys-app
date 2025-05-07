'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  Container,
  Button,
  useTheme,
  alpha,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  AppBar,
  Toolbar,
  Slide,
  Fade,
  Zoom
} from '@mui/material'
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowDown as ArrowDownIcon,
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
  Group as GroupIcon,
  Devices as DevicesIcon
} from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import styles from '../styles/landing.module.css'
import { useLandingTheme } from '@/theme/LandingThemeProvider'

const Header = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { mode } = useLandingTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Determine if header should be visible (hide on scroll down, show on scroll up)
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100)
      setPrevScrollPos(currentScrollPos)

      // Determine if header should be solid or transparent
      if (currentScrollPos > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  // Add floating animation to logo
  useEffect(() => {
    if (!logoRef.current) return

    let animationFrameId: number
    let startTime: number | null = null
    const duration = 3000 // 3 seconds per cycle
    const amplitude = 5 // 5px up and down

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Calculate position using sine wave
      const position = amplitude * Math.sin((elapsed / duration) * Math.PI * 2)

      // Apply transform if logo ref still exists
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${position}px)`
      }

      // Continue animation
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted])

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  // Navigation links with icons
  const navLinks = [
    {
      text: mounted ? t('landing.featuresSection.title') : 'Our Features',
      href: "#features",
      icon: <LightbulbIcon fontSize="small" />
    },
    {
      text: mounted ? t('landing.howItWorks.title') : 'How It Works',
      href: "#how-it-works",
      icon: <SchoolIcon fontSize="small" />
    },
    {
      text: mounted ? t('landing.testimonialsSection.title') : 'Testimonials',
      href: "#testimonials",
      icon: <GroupIcon fontSize="small" />
    },
    {
      text: mounted ? t('landing.statsSection.title') : 'Our Impact',
      href: "#stats",
      icon: <DevicesIcon fontSize="small" />
    }
  ]

  // Get background styles based on theme and scroll state
  const getHeaderBg = () => {
    if (!scrolled) return 'transparent'

    return mode === 'light'
      ? alpha(theme.palette.background.paper, 0.8)
      : alpha(theme.palette.background.paper, 0.85)
  }

  // Get text color based on theme and scroll state
  const getTextColor = () => {
    if (!scrolled) return 'white'

    return mode === 'light'
      ? theme.palette.text.primary
      : theme.palette.text.primary
  }

  return (
    <Slide appear={false} direction="down" in={visible}>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: getHeaderBg(),
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? (theme as any).customShadows?.z1 : 'none',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled
            ? 'none'
            : `1px solid ${alpha(theme.palette.common.white, mode === 'light' ? 0.1 : 0.05)}`,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: { xs: 1.5, md: 2 },
              px: { xs: 2, sm: 3, md: 0 }
            }}
          >
            <Box
              ref={logoRef}
              sx={{
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease',
              }}
            >
              <Typography
                variant="h6"
                component={Link}
                href="/"
                sx={{
                  fontWeight: 'bold',
                  color: scrolled ? 'primary.main' : 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  letterSpacing: '0.5px',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: '100%',
                    height: 2,
                    background: theme.palette.primary.main,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::after': {
                    opacity: 1,
                  }
                }}
              >
                <Box
                  component="img"
                  src={mode === 'light'
                    ? "/logo/Logo-dark.svg"
                    : "/logo/Logo-light.svg"}
                  alt="Logo"
                  sx={{
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                    mr: { xs: 1, sm: 1.5 },
                    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                    transition: 'all 0.3s ease',
                    display: 'block',
                    '&:hover': {
                      transform: 'scale(1.05) rotate(5deg)',
                    }
                  }}
                />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {mounted ? t('landing.appName') : 'IELTS Learning Hub'}
                </Box>
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isTablet && (
              <Fade in={mounted} timeout={1000}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { md: 3, lg: 4 }
                }}>
                  {navLinks.map((link, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        component={Link}
                        href={link.href}
                        sx={{
                          color: getTextColor(),
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: '1rem',
                          position: 'relative',
                          py: 1,
                          px: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          borderRadius: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.08),
                            transform: 'translateY(-2px)',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            width: 0,
                            height: 2,
                            background: (theme as any).customGradients?.primary,
                            transition: 'all 0.3s ease',
                            transform: 'translateX(-50%)',
                          },
                          '&:hover::after': {
                            width: '80%',
                          }
                        }}
                      >
                        {link.icon}
                        {link.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Fade>
            )}

            <Fade in={mounted} timeout={1000}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2, md: 2 }
              }}>
                <ThemeToggle color={getTextColor()} />
                <LanguageSwitcher color={scrolled ? 'primary' : 'inherit'} />

                {!isTablet ? (
                  <>
                    <Button
                      component={Link}
                      href="/pages/login"
                      variant="outlined"
                      color={scrolled ? "primary" : "inherit"}
                      sx={{
                        borderColor: scrolled ? 'primary.main' : 'white',
                        color: scrolled ? 'primary.main' : 'white',
                        borderRadius: '12px',
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        borderWidth: '2px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: scrolled ? 'primary.main' : 'white',
                          borderWidth: '2px',
                          bgcolor: scrolled
                            ? alpha(theme.palette.primary.main, 0.1)
                            : alpha(theme.palette.common.white, 0.1),
                          transform: 'translateY(-3px)',
                          boxShadow: (theme as any).customShadows?.z1,
                        }
                      }}
                    >
                      {t('common.login')}
                    </Button>
                    <Button
                      component={Link}
                      href="/pages/register"
                      variant="contained"
                      color="primary"
                      sx={{
                        boxShadow: (theme as any).customShadows?.primary,
                        borderRadius: '12px',
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        background: (theme as any).customGradients?.primary,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: (theme as any).customShadows?.buttonHover,
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      {t('landing.getStarted')}
                    </Button>
                  </>
                ) : (
                  <IconButton
                    onClick={toggleDrawer}
                    aria-label="Open menu"
                    sx={{
                      color: getTextColor(),
                      ml: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'rotate(90deg)',
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    <MenuIcon fontSize={isMobile ? "medium" : "large"} />
                  </IconButton>
                )}
              </Box>
            </Fade>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '85%', sm: '60%' },
              maxWidth: '360px',
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              boxShadow: (theme as any).customShadows?.z3,
              borderRadius: { xs: '16px 0 0 16px', sm: '24px 0 0 24px' },
            }
          }}
        >
          <Box sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                background: (theme as any).customGradients?.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box
                component="img"
                src={mode === 'light'
                  ? "/logo/Logo-dark.svg"
                  : "/logo/Logo-light.svg"}
                alt="Logo"
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1,
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                }}
              />
              {mounted ? t('landing.appName') : 'IELTS Learning Hub'}
            </Typography>
            <IconButton
              onClick={toggleDrawer}
              aria-label="Close menu"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'rotate(90deg)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ py: 2 }}>
            {navLinks.map((link, index) => (
              <Zoom key={index} in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href={link.href}
                    onClick={toggleDrawer}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderRadius: 2,
                      mx: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    <Box sx={{ mr: 2, color: 'primary.main' }}>
                      {link.icon}
                    </Box>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: '1.1rem'
                          }}
                        >
                          {link.text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </Zoom>
            ))}
          </List>

          <Box sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 'auto',
            borderTop: `1px solid ${theme.palette.divider}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <ThemeToggle size="large" />
              <Box sx={{ mx: 2 }}>
                <LanguageSwitcher color="primary" />
              </Box>
            </Box>

            <Button
              component={Link}
              href="/pages/login"
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderWidth: '2px',
                  transform: 'translateY(-3px)',
                  boxShadow: (theme as any).customShadows?.z1,
                }
              }}
            >
              {t('common.login')}
            </Button>
            <Button
              component={Link}
              href="/pages/register"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                background: (theme as any).customGradients?.primary,
                boxShadow: (theme as any).customShadows?.primary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: (theme as any).customShadows?.buttonHover,
                  transform: 'translateY(-3px)',
                }
              }}
            >
              {t('landing.getStarted')}
            </Button>
          </Box>
        </Drawer>
      </AppBar>
    </Slide>
  )
}

export default Header
