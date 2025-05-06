'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  alpha,
  IconButton,
  Divider
} from '@mui/material'
import {
  FormatQuote,
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material'
import { useTranslation } from '@/utils/i18n'

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  testimonial: string;
  isVisible: boolean;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, avatar, rating, testimonial, isVisible, delay }) => {
  const theme = useTheme()

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'visible',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${delay}s`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        boxShadow: theme.shadows[2],
        '&:hover': {
          boxShadow: theme.shadows[8],
          transform: 'translateY(-8px)',
          borderColor: alpha(theme.palette.primary.main, 0.2),
        }
      }}
    >
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{
              color: theme.palette.secondary.main,
              '& .MuiRating-iconFilled': {
                filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))'
              }
            }}
          />

          <FormatQuote
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem' },
              color: alpha(theme.palette.primary.main, 0.15),
              transform: 'rotate(180deg)'
            }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            position: 'relative',
            zIndex: 1,
            fontStyle: 'italic',
            lineHeight: 1.8,
            color: theme.palette.text.secondary,
            fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.0625rem' },
            minHeight: { xs: '120px', sm: '150px' },
            mb: 3
          }}
        >
          "{testimonial}"
        </Typography>

        <Divider sx={{ my: 3, opacity: 0.6 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
              border: `3px solid ${alpha(theme.palette.background.paper, 0.8)}`,
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
            }}
          />
          <Box sx={{ ml: 2.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.0625rem', sm: '1.125rem', md: '1.25rem' },
                color: 'text.primary',
                mb: 0.5
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                opacity: 0.85,
                fontWeight: 500
              }}
            >
              {role}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  testimonial: string;
}

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

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

  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "Nguyen Van A",
      role: "IELTS Student",
      avatar: "/images/landing/testimonial-1.jpg",
      rating: 5,
      testimonial: "The AI-powered writing feedback helped me improve my IELTS score from 6.5 to 7.5 in just two months. The detailed analysis of my essays was incredibly helpful."
    },
    {
      name: "Tran Thi B",
      role: "University Student",
      avatar: "/images/landing/testimonial-2.jpg",
      rating: 4.5,
      testimonial: "The adaptive testing feature is amazing! It adjusts to my level and helps me focus on areas where I need improvement. My vocabulary has expanded significantly."
    },
    {
      name: "Le Van C",
      role: "Working Professional",
      avatar: "/images/landing/testimonial-3.jpg",
      rating: 5,
      testimonial: "I love the AI tutor chat. It's like having a personal English teacher available 24/7. The Vietnamese interface makes it easy to navigate and understand."
    }
  ]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <Box
      ref={sectionRef}
      id="testimonials"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
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
          top: '5%',
          left: '0',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '0',
          width: '70%',
          height: '60%',
          background: `radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.04)} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />

      {/* Additional decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          width: { xs: '30px', md: '50px' },
          height: { xs: '30px', md: '50px' },
          borderRadius: '10px',
          transform: 'rotate(25deg)',
          background: alpha(theme.palette.primary.main, 0.06),
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '10%',
          width: { xs: '25px', md: '40px' },
          height: { xs: '25px', md: '40px' },
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.08),
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 3 } }}>
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
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              position: 'relative',
              display: 'inline-block',
              mb: 2,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '50px', sm: '60px' },
                height: '3px',
                background: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}
          >
            {t('landing.testimonialsSection.title')}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              mt: 4,
              fontWeight: 'normal',
              fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              opacity: 0.85
            }}
          >
            {t('landing.testimonialsSection.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, sm: 5, md: 6 },
            mb: { xs: 6, md: 8 },
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.2s'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              testimonial={testimonial.testimonial}
              isVisible={isVisible}
              delay={index * 0.2}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            mt: { xs: 4, md: 6 },
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.6s'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3
            }}
          >
            <IconButton
              onClick={handlePrev}
              aria-label="Previous testimonial"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: { xs: 48, md: 56 },
                height: { xs: 48, md: 56 },
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  transform: 'translateX(-3px)'
                },
                transition: 'all 0.3s ease',
                boxShadow: theme.shadows[2]
              }}
            >
              <ArrowBackIos sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, ml: 1 }} />
            </IconButton>

            <IconButton
              onClick={handleNext}
              aria-label="Next testimonial"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: { xs: 48, md: 56 },
                height: { xs: 48, md: 56 },
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  transform: 'translateX(3px)'
                },
                transition: 'all 0.3s ease',
                boxShadow: theme.shadows[2]
              }}
            >
              <ArrowForwardIos sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' } }} />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              opacity: 0.7,
              fontStyle: 'italic'
            }}
          >
            Swipe to see more testimonials
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default TestimonialsSection
