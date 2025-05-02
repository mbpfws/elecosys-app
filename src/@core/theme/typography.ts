// Type Imports
import type { TypographyOptions } from '@mui/material/styles/createTypography'

// Font Imports
import { Inter } from 'next/font/google'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const typography: TypographyOptions = {
  fontFamily: inter.style.fontFamily,
  h1: {
    fontWeight: 600,
    letterSpacing: '-0.009em',
    lineHeight: 1.2,
    fontSize: '2.5rem'
  },
  h2: {
    fontWeight: 600,
    letterSpacing: '-0.006em',
    lineHeight: 1.3,
    fontSize: '2rem'
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '-0.003em',
    fontSize: '1.75rem'
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '-0.003em',
    fontSize: '1.5rem'
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '-0.003em',
    fontSize: '1.25rem'
  },
  h6: {
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '-0.003em',
    fontSize: '1.125rem'
  },
  body1: {
    letterSpacing: '-0.003em',
    fontSize: '1rem'
  },
  body2: {
    letterSpacing: '-0.003em',
    fontSize: '0.875rem'
  },
  subtitle1: {
    letterSpacing: '-0.003em',
    fontSize: '1rem'
  },
  subtitle2: {
    letterSpacing: '-0.003em',
    fontSize: '0.875rem'
  },
  button: {
    letterSpacing: '-0.003em',
    fontSize: '0.875rem',
    fontWeight: 500
  },
  caption: {
    letterSpacing: '-0.003em',
    fontSize: '0.75rem'
  },
  overline: {
    letterSpacing: '0.1em',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase'
  }
}

export default typography
