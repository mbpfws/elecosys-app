'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress, Box, Typography } from '@mui/material'
import { useTranslation } from '@/utils/i18n'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    // Redirect to the landing page
    router.push('/landing')
  }, [router])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6">
        {t('common.loading')}
      </Typography>
    </Box>
  )
}
