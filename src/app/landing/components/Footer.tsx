'use client'

import React from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  Container,
  Grid,
  Divider,
  IconButton,
  useTheme,
  alpha,
  useMediaQuery,
  Paper,
  Button
} from '@mui/material'
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LinkedIn,
  KeyboardArrowUp,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'

interface FooterLinkSection {
  title: string;
  links: {
    text: string;
    href: string;
  }[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  // Footer links
  const footerLinks: FooterLinkSection[] = [
    {
      title: "Platform",
      links: [
        { text: "Features", href: "#features" },
        { text: "How It Works", href: "#how-it-works" },
        { text: "Pricing", href: "#pricing" },
        { text: "FAQ", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", href: "#" },
        { text: "IELTS Tips", href: "#" },
        { text: "Study Materials", href: "#" },
        { text: "Success Stories", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Contact", href: "#" },
        { text: "Partners", href: "#" }
      ]
    }
  ]

  // Social media links
  const socialLinks: SocialLink[] = [
    { icon: <Facebook />, href: "#", label: "Facebook" },
    { icon: <Twitter />, href: "#", label: "Twitter" },
    { icon: <Instagram />, href: "#", label: "Instagram" },
    { icon: <YouTube />, href: "#", label: "YouTube" },
    { icon: <LinkedIn />, href: "#", label: "LinkedIn" }
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.background.default,
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
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

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: `linear-gradient(0deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.background.default, 0)} 100%)`,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 3 } }}>
        {/* Newsletter Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            mb: { xs: 6, md: 8 },
            borderRadius: '16px',
            background: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            boxShadow: theme.shadows[2],
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 3, md: 4 }
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: 'bold',
                mb: 1.5,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              {t('landing.footer.newsletter.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.9375rem', sm: '1rem' },
                lineHeight: 1.6
              }}
            >
              {t('landing.footer.newsletter.description')}
            </Typography>
          </Box>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: { xs: '100%', md: 'auto' }
            }}
          >
            <Box
              component="input"
              placeholder={t('landing.footer.newsletter.placeholder')}
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: '8px',
                border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                color: theme.palette.text.primary,
                fontSize: '1rem',
                width: { xs: '100%', sm: '240px' },
                outline: 'none',
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                },
                transition: 'all 0.2s ease'
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: '8px',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '1rem',
                whiteSpace: 'nowrap'
              }}
            >
              {t('landing.footer.newsletter.button')}
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              order: { xs: 1, md: 1 }
            }}
          >
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                <Box
                  component="img"
                  src="/images/logo.png"
                  alt="Logo"
                  sx={{
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                    mr: 1.5
                  }}
                />
                {t('landing.appName')}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                  maxWidth: '90%'
                }}
              >
                {t('landing.footer.description')}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      },
                      transition: 'all 0.2s ease'
                    }}
                    size={isMobile ? "small" : "medium"}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Email fontSize="small" color="primary" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                  >
                    {t('landing.footer.contact.email')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Phone fontSize="small" color="primary" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                  >
                    {t('landing.footer.contact.phone')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <LocationOn fontSize="small" color="primary" sx={{ mt: 0.3 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                  >
                    {t('landing.footer.contact.address')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            sx={{
              order: { xs: 2, md: 2 }
            }}
          >
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {footerLinks.map((section, index) => (
                <Grid
                  key={index}
                  {...{
                    item: true,
                    xs: 12,
                    sm: 4
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: { xs: 2, md: 3 },
                      fontSize: { xs: '1.125rem', sm: '1.25rem' },
                      position: 'relative',
                      display: 'inline-block',
                      pb: 1,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '40px',
                        height: '2px',
                        background: theme.palette.primary.main,
                        borderRadius: '1px'
                      }
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        style={{ textDecoration: 'none' }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                            '&:hover': {
                              color: theme.palette.primary.main,
                              transform: 'translateX(5px)'
                            },
                            transition: 'all 0.2s ease',
                            display: 'inline-block'
                          }}
                        >
                          {link.text}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 5 }, opacity: 0.6 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © {new Date().getFullYear()} {t('landing.appName')}. {t('landing.footer.copyright')}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, sm: 3 },
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-end' }
            }}
          >
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  transition: 'color 0.2s ease'
                }}
              >
                Terms
              </Typography>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  transition: 'color 0.2s ease'
                }}
              >
                Privacy
              </Typography>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  transition: 'color 0.2s ease'
                }}
              >
                Cookies
              </Typography>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  transition: 'color 0.2s ease'
                }}
              >
                Sitemap
              </Typography>
            </Link>
          </Box>
        </Box>

        {/* Scroll to top button */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            zIndex: 10
          }}
        >
          <IconButton
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
              },
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              boxShadow: theme.shadows[2],
              transition: 'all 0.2s ease'
            }}
          >
            <KeyboardArrowUp />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
