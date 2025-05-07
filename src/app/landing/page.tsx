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

// Theme Provider
import LandingThemeProvider from '@/theme/LandingThemeProvider'

export default function LandingPage() {
  // Add section IDs for navigation
  useEffect(() => {
    // Add any initialization if needed
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const targetId = this.getAttribute('href')
        if (!targetId) return

        const targetElement = document.querySelector(targetId)
        if (!targetElement) return

        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Offset for header
          behavior: 'smooth'
        })
      })
    })
  }, [])

  return (
    <LandingThemeProvider>
      <Box sx={{ minHeight: '100vh' }}>
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
    </LandingThemeProvider>
  )
}
