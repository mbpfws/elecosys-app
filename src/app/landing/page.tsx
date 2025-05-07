'use client'

import { useEffect } from 'react'
import { Box } from '@mui/material'

// Component Imports
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import TestimonialsSection from './components/TestimonialsSection'
import StatsSection from './components/StatsSection'
import PricingSection from './components/PricingSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function LandingPage() {
  // Add section IDs for navigation
  useEffect(() => {
    // Add any initialization if needed
  }, [])

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box component="main"> {/* Padding top is handled by each section */}
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Statistics/Impact Section */}
        <StatsSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  )
}
