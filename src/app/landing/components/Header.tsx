'use client'

import { useState, useEffect } from 'react'
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
  Toolbar
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  // Navigation links
  const navLinks = [
    { text: "Features", href: "#features" },
    { text: "How It Works", href: "#how-it-works" },
    { text: "Pricing", href: "#pricing" },
    { text: "Testimonials", href: "#testimonials" }
  ]

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        bgcolor: scrolled ? 'background.paper' : 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? theme.shadows[4] : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        background: scrolled ? alpha(theme.palette.background.paper, 0.9) : 'transparent',
        borderBottom: scrolled ? 'none' : `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
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
              letterSpacing: '0.5px'
            }}
          >
            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo"
              sx={{
                width: { xs: 32, sm: 36, md: 40 },
                height: { xs: 32, sm: 36, md: 40 },
                mr: { xs: 1, sm: 1.5 }
              }}
            />
            {t('landing.appName')}
          </Typography>

          {/* Desktop Navigation */}
          {!isTablet && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { md: 3, lg: 4 }
            }}>
              {navLinks.map((link, index) => (
                <Typography
                  key={index}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: scrolled ? 'text.primary' : 'white',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    position: 'relative',
                    py: 1,
                    '&:hover': {
                      color: scrolled ? 'primary.main' : alpha(theme.palette.common.white, 0.8)
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 0,
                      height: 2,
                      bgcolor: scrolled ? 'primary.main' : 'white',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {link.text}
                </Typography>
              ))}
            </Box>
          )}

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 2, md: 3 }
          }}>
            <LanguageSwitcher color={scrolled ? 'primary' : 'white'} />

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
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      borderColor: scrolled ? 'primary.main' : 'white',
                      bgcolor: scrolled ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.common.white, 0.1)
                    }
                  }}
                >
                  {t('common.login')}
                </Button>
                <Button
                  component={Link}
                  href="/pages/register"
                  variant="contained"
                  color={scrolled ? "primary" : "secondary"}
                  sx={{
                    boxShadow: theme.shadows[4],
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-2px)'
                    },
                    transition: 'transform 0.2s ease'
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
                  color: scrolled ? 'text.primary' : 'white',
                  ml: 1
                }}
              >
                <MenuIcon fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
            )}
          </Box>
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
            boxShadow: theme.shadows[8]
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
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo"
              sx={{
                width: 32,
                height: 32,
                mr: 1
              }}
            />
            {t('landing.appName')}
          </Typography>
          <IconButton
            onClick={toggleDrawer}
            aria-label="Close menu"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ py: 2 }}>
          {navLinks.map((link, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={toggleDrawer}
                sx={{
                  py: 1.5,
                  px: 3,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                <ListItemText
                  primary={link.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
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
          <Button
            component={Link}
            href="/pages/login"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem'
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
              borderRadius: '8px',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: theme.shadows[4]
            }}
          >
            {t('landing.getStarted')}
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Header
