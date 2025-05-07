'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Switch,
  FormControlLabel,
  useMediaQuery
} from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'

interface PricingCardProps {
  title: string;
  price: number;
  features: Array<{ text: string; included: boolean }>;
  isPopular: boolean;
  ctaText: string;
  ctaLink: string;
  isVisible: boolean;
  delay: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, isPopular, ctaText, ctaLink, isVisible, delay }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isPopular ? theme.shadows[10] : theme.shadows[2],
        border: isPopular ? `2px solid ${theme.palette.primary.main}` : `1px solid ${alpha(theme.palette.divider, 0.8)}`,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s ease',
        transitionDelay: `${delay}s`,
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: isPopular ? theme.shadows[15] : theme.shadows[8]
        }
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: -30,
            transform: 'rotate(45deg)',
            background: theme.palette.primary.main,
            color: 'white',
            py: 0.5,
            px: 4,
            fontWeight: 'bold',
            fontSize: '0.75rem',
            zIndex: 1,
            boxShadow: theme.shadows[2],
            width: 120,
            textAlign: 'center'
          }}
        >
          {t('landing.pricing.popular')}
        </Box>
      )}

      <CardContent sx={{
        p: { xs: 3, sm: 4 },
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            color: isPopular ? theme.palette.primary.main : 'inherit'
          }}
        >
          {title}
        </Typography>

        {/* Pricing plan image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            component="img"
            src={price === 0
              ? "/images/landing/pricing-basic.png"
              : price <= 7 || price <= 9
                ? "/images/landing/pricing-standard.png"
                : "/images/landing/pricing-enterprise.png"
            }
            alt={title}
            sx={{
              width: '100px',
              height: '100px',
              filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.25rem', sm: '2.5rem', md: '2.75rem' },
              display: 'inline-flex',
              alignItems: 'flex-start',
              lineHeight: 1.2
            }}
          >
            {price === 0 ? t('landing.pricing.free.title') : (
              <>
                <Box component="span" sx={{
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  mt: 0.5,
                  mr: 0.5
                }}>$</Box>
                {price}
              </>
            )}
          </Typography>
          {price > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {t('landing.pricing.perMonth')}
            </Typography>
          )}
        </Box>

        <List sx={{
          mb: 4,
          flexGrow: 1,
          '& .MuiListItem-root': {
            px: 0,
            py: { xs: 0.75, sm: 1 }
          }
        }}>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{
                minWidth: { xs: 28, sm: 36 },
                color: feature.included ? theme.palette.success.main : theme.palette.text.disabled
              }}>
                {feature.included ? (
                  <Check fontSize={isMobile ? "small" : "medium"} />
                ) : (
                  <Close fontSize={isMobile ? "small" : "medium"} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                      color: feature.included ? 'text.primary' : 'text.disabled'
                    }}
                  >
                    {feature.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Button
          component={Link}
          href={ctaLink}
          variant={isPopular ? 'contained' : 'outlined'}
          color={isPopular ? 'primary' : 'primary'}
          fullWidth
          size="large"
          sx={{
            py: { xs: 1.25, sm: 1.5 },
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: { xs: '0.9375rem', sm: '1rem' },
            textTransform: 'none',
            boxShadow: isPopular ? theme.shadows[4] : 'none',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: isPopular ? theme.shadows[8] : theme.shadows[2]
            },
            transition: 'all 0.3s ease'
          }}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}

const PricingSection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  // Responsive design is handled through sx props
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)

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

  const handlePricingToggle = () => {
    setIsAnnual(!isAnnual)
  }

  // Pricing data with translations
  const pricingPlans = [
    {
      title: t('landing.pricing.free.title') || "Free",
      price: 0,
      features: [
        { text: t('landing.pricing.free.features.writingFeedback') || "Basic AI Writing Feedback", included: true },
        { text: t('landing.pricing.free.features.adaptiveTests') || "Limited Adaptive Tests", included: true },
        { text: t('landing.pricing.free.features.aiTutor') || "Basic AI Tutor Chat", included: true },
        { text: t('landing.pricing.free.features.progressTracking') || "Progress Tracking", included: true },
        { text: t('landing.pricing.free.features.vietnameseInterface') || "Vietnamese Interface", included: true },
        { text: t('landing.pricing.free.features.advancedWriting') || "Advanced Writing Analysis", included: false },
        { text: t('landing.pricing.free.features.unlimitedTests') || "Unlimited Adaptive Tests", included: false },
        { text: t('landing.pricing.free.features.prioritySupport') || "Priority Support", included: false }
      ],
      isPopular: false,
      ctaText: t('landing.pricing.free.ctaText') || "Get Started",
      ctaLink: "/pages/register"
    },
    {
      title: t('landing.pricing.premium.title') || "Premium",
      price: isAnnual ? 9 : 12,
      features: [
        { text: t('landing.pricing.premium.features.writingFeedback') || "Advanced AI Writing Feedback", included: true },
        { text: t('landing.pricing.premium.features.adaptiveTests') || "Unlimited Adaptive Tests", included: true },
        { text: t('landing.pricing.premium.features.aiTutor') || "Full AI Tutor Access", included: true },
        { text: t('landing.pricing.premium.features.progressTracking') || "Detailed Progress Analytics", included: true },
        { text: t('landing.pricing.premium.features.vietnameseInterface') || "Vietnamese Interface", included: true },
        { text: t('landing.pricing.premium.features.speakingPractice') || "Speaking Practice Tools", included: true },
        { text: t('landing.pricing.premium.features.studyPlan') || "Personalized Study Plan", included: true },
        { text: t('landing.pricing.premium.features.prioritySupport') || "Priority Support", included: true }
      ],
      isPopular: true,
      ctaText: t('landing.pricing.premium.ctaText') || "Get Premium",
      ctaLink: "/pages/register"
    },
    {
      title: t('landing.pricing.standard.title') || "Standard",
      price: isAnnual ? 5 : 7,
      features: [
        { text: t('landing.pricing.standard.features.writingFeedback') || "Enhanced AI Writing Feedback", included: true },
        { text: t('landing.pricing.standard.features.adaptiveTests') || "Extended Adaptive Tests", included: true },
        { text: t('landing.pricing.standard.features.aiTutor') || "Standard AI Tutor Access", included: true },
        { text: t('landing.pricing.standard.features.progressTracking') || "Enhanced Progress Tracking", included: true },
        { text: t('landing.pricing.standard.features.vietnameseInterface') || "Vietnamese Interface", included: true },
        { text: t('landing.pricing.standard.features.speakingPractice') || "Speaking Practice Tools", included: false },
        { text: t('landing.pricing.standard.features.studyPlan') || "Personalized Study Plan", included: false },
        { text: t('landing.pricing.standard.features.prioritySupport') || "Priority Support", included: false }
      ],
      isPopular: false,
      ctaText: t('landing.pricing.standard.ctaText') || "Choose Standard",
      ctaLink: "/pages/register"
    }
  ]

  return (
    <Box
      ref={sectionRef}
      id="pricing"
      sx={{
        py: { xs: 10, sm: 12, md: 16 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.03),
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.04),
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
            {t('landing.pricingSection.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mt: 5,
              mb: 2,
              fontWeight: 'normal',
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6
            }}
          >
            {t('landing.pricingSection.subtitle')}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 5,
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease',
              transitionDelay: '0.3s',
              px: 2
            }}
          >
            <Typography
              variant="body1"
              color={isAnnual ? 'text.secondary' : 'primary.main'}
              sx={{
                fontWeight: isAnnual ? 'normal' : 'bold',
                fontSize: { xs: '0.9375rem', sm: '1rem' }
              }}
            >
              {t('landing.pricing.monthly')}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isAnnual}
                  onChange={handlePricingToggle}
                  color="primary"
                  sx={{ mx: { xs: 1, sm: 2 } }}
                />
              }
              label=""
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body1"
                color={isAnnual ? 'primary.main' : 'text.secondary'}
                sx={{
                  fontWeight: isAnnual ? 'bold' : 'normal',
                  fontSize: { xs: '0.9375rem', sm: '1rem' }
                }}
              >
                {t('landing.pricing.annual')}
              </Typography>
              <Box
                component="span"
                sx={{
                  color: 'success.main',
                  fontWeight: 'bold',
                  ml: 1,
                  px: 1.5,
                  py: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  borderRadius: '4px',
                  display: 'inline-block'
                }}
              >
                {t('landing.pricing.savePercent')}
              </Box>
            </Box>
          </Box>
        </Box>

        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          justifyContent="center"
        >
          {pricingPlans.map((plan, index) => (
            <Grid
              key={index}
              size={{
                xs: 12,
                sm: index === 1 ? 12 : 6,
                md: 4
              }}
              sx={{
                order: {
                  xs: plan.isPopular ? 0 : index + 1,
                  md: index
                }
              }}
            >
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
                ctaText={plan.ctaText}
                ctaLink={plan.ctaLink}
                isVisible={isVisible}
                delay={index * 0.2}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: { xs: 6, sm: 8 },
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.6s'
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              p: 2,
              borderRadius: '8px',
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              display: 'inline-block',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            {t('landing.pricing.freeTrial')}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default PricingSection
