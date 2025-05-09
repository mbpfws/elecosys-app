/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  important: '#__next',
  theme: {
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      '2xl': '1920px'
    },
    extend: {
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '10px',
        '2xl': '12px',
        '3xl': '16px',
        full: '9999px'
      },
      colors: {
        primary: 'var(--primary-color, #8C57FF)',
        primaryLight: 'rgba(140, 87, 255, 0.16)',
        primaryLighter: 'rgba(140, 87, 255, 0.08)',
        secondary: '#8A8D93',
        error: '#FF4C51',
        errorLight: 'rgba(255, 76, 81, 0.16)',
        errorLighter: 'rgba(255, 76, 81, 0.08)',
        warning: '#FFB400',
        info: '#16B1FF',
        success: '#56CA00',
        textPrimary: 'rgba(46, 38, 61, 0.9)',
        textSecondary: 'rgba(46, 38, 61, 0.7)',
        textDisabled: 'rgba(46, 38, 61, 0.4)',
        actionActive: 'rgba(46, 38, 61, 0.54)',
        actionHover: 'rgba(46, 38, 61, 0.04)',
        actionSelected: 'rgba(46, 38, 61, 0.08)',
        actionFocus: 'rgba(46, 38, 61, 0.12)',
        backgroundPaper: '#FFFFFF',
        backgroundDefault: '#F4F5FA',
        backdrop: 'rgba(46, 38, 61, 0.5)',
        facebook: '#4267B2',
        twitter: '#1DA1F2',
        linkedin: '#007BB6',
        github: '#272727',
        googlePlus: '#DB4437'
      },
      boxShadow: {
        xs: '0px 2px 4px rgba(46, 38, 61, 0.06)',
        sm: '0px 4px 8px rgba(46, 38, 61, 0.1)',
        DEFAULT: '0px 6px 12px rgba(46, 38, 61, 0.12)',
        md: '0px 6px 12px rgba(46, 38, 61, 0.12)',
        lg: '0px 8px 16px rgba(46, 38, 61, 0.14)',
        xl: '0px 10px 20px rgba(46, 38, 61, 0.16)'
      },
      zIndex: {
        header: '1100',
        footer: '10',
        customizer: '1200',
        search: '1400',
        drawer: '1200'
      }
    }
  }
}
