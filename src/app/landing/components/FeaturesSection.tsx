'use client'

// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { useTranslation } from '@/utils/i18n'

// SVG Imports
// We'll use MUI icons as a temporary replacement for the SVG components
import {
  School as SchoolIcon,
  AutoStories as AutoStoriesIcon,
  Quiz as QuizIcon,
  Chat as ChatIcon,
  Language as LanguageIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material'

// Styles Imports
import styles from '../styles/landing.module.css'
import frontCommonStyles from '../styles/frontCommon.module.css'

// Component for Lines SVG (temporary replacement)
const Lines = () => (
  <svg width="32" height="2" viewBox="0 0 32 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H31" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// Data
const features = [
  {
    icon: <AutoStoriesIcon sx={{ fontSize: '28px', color: 'primary.main' }} />,
    title: 'landing.features.writingTools.title',
    description: 'landing.features.writingTools.description',
    animationClass: 'fadeInUp'
  },
  {
    icon: <QuizIcon sx={{ fontSize: '28px', color: 'primary.main' }} />,
    title: 'landing.features.adaptiveTest.title',
    description: 'landing.features.adaptiveTest.description',
    animationClass: 'fadeInUp'
  },
  {
    icon: <ChatIcon sx={{ fontSize: '28px', color: 'primary.main' }} />,
    title: 'landing.features.aiTutor.title',
    description: 'landing.features.aiTutor.description',
    animationClass: 'fadeInUp'
  },
  {
    icon: <LanguageIcon sx={{ fontSize: '28px', color: 'primary.main' }} />,
    title: 'landing.features.vietnamese.title',
    description: 'landing.features.vietnamese.description',
    animationClass: 'fadeInUp'
  },
  {
    icon: <SchoolIcon sx={{ fontSize: '28px', color: 'primary.main' }} />,
    title: 'landing.features.structured.title',
    description: 'landing.features.structured.description',
    animationClass: 'fadeInUp'
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: '28px', color: 'primary.main' }} />,
    title: 'landing.features.progress.title',
    description: 'landing.features.progress.description',
    animationClass: 'fadeInUp'
  }
]

const FeaturesSection = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
  }, [])

  return (
    <section id='features' ref={ref} className='bg-backgroundPaper'>
      <Box className={classnames(frontCommonStyles.sectionPadding, frontCommonStyles.layoutSpacing)}>
        <Box className={frontCommonStyles.sectionTitle}>
          <Box className='flex items-center justify-center mbe-6 gap-3'>
            <Lines />
            <Typography color='text.primary' className='font-medium uppercase'>
              {t('landing.featuresSection.title')}
            </Typography>
            <Lines />
          </Box>
          <Typography variant='h4' className='font-bold mbe-4'>
            {t('landing.featuresSection.subtitle')}
          </Typography>
          <Typography className='font-medium text-center max-is-[700px] mli-auto'>
            {t('landing.featuresSection.description')}
          </Typography>
        </Box>
        <Grid container spacing={6} className='mbs-8'>
          {features.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Box
                className={classnames(
                  'flex flex-col gap-4 justify-center items-center text-center',
                  styles[item.animationClass]
                )}
                sx={{ animationDelay: `${index * 0.1}s` }}
              >
                <Box className={classnames('mbe-2', styles.featureIcon)}>
                  <Box
                    className='flex items-center justify-center border-2 rounded-full p-5 is-[82px] bs-[82px]'
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 16px rgba(140, 87, 255, 0.2)'
                      }
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
                <Typography variant='h5' className='font-semibold'>{t(item.title)}</Typography>
                <Typography className='max-is-[364px] text-center'>{t(item.description)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  )
}

export default FeaturesSection
