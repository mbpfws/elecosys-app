'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress, Box, Typography } from '@mui/material'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, we would check if the user is authenticated
    // For now, we'll redirect to the login page
    // Later, we'll implement authentication and redirect to dashboard if authenticated
    // With Next.js App Router, parentheses in route segments are used for grouping
    // and don't appear in the URL
    router.push('/pages/login')
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
        Loading...
      </Typography>
    </Box>
  )
}
