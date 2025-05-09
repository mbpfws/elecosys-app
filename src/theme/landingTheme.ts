// MUI Imports
import { createTheme, responsiveFontSizes, Shadows } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { Inter } from 'next/font/google';

// Extend the palette types to match Materio theme approach
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighterOpacity?: string;
    lightOpacity?: string;
    mainOpacity?: string;
    darkOpacity?: string;
    darkerOpacity?: string;
  }
  interface SimplePaletteColorOptions {
    lighterOpacity?: string;
    lightOpacity?: string;
    mainOpacity?: string;
    darkOpacity?: string;
    darkerOpacity?: string;
  }

  interface CustomColors {
    bodyBg: string;
    chatBg: string;
    greyLightBg: string;
    inputBorder: string;
    tableHeaderBg: string;
    tooltipText: string;
    trackBg: string;
  }

  interface Palette {
    customColors: CustomColors;
  }

  interface PaletteOptions {
    customColors?: Partial<CustomColors>;
  }
}

// Load Inter font
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

// Create the theme
export const createLandingTheme = (mode: PaletteMode) => {
  // Define colors based on mode
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode colors - Aligned with Materio
            primary: {
              main: '#8C57FF',
              light: '#A379FF',
              dark: '#7E4EE6',
              contrastText: '#fff',
              lighterOpacity: 'rgb(140, 87, 255, 0.08)',
              lightOpacity: 'rgb(140, 87, 255, 0.16)',
              mainOpacity: 'rgb(140, 87, 255, 0.24)',
              darkOpacity: 'rgb(140, 87, 255, 0.32)',
              darkerOpacity: 'rgb(140, 87, 255, 0.38)',
            },
            secondary: {
              main: '#8A8D93',
              light: '#A1A4A9',
              dark: '#7C7F84',
              contrastText: '#fff',
              lighterOpacity: 'rgb(138, 141, 147, 0.08)',
              lightOpacity: 'rgb(138, 141, 147, 0.16)',
              mainOpacity: 'rgb(138, 141, 147, 0.24)',
              darkOpacity: 'rgb(138, 141, 147, 0.32)',
              darkerOpacity: 'rgb(138, 141, 147, 0.38)',
            },
            error: {
              main: '#FF4C51',
              light: '#FF7074',
              dark: '#E64449',
              contrastText: '#fff',
              lighterOpacity: 'rgb(255, 76, 81, 0.08)',
              lightOpacity: 'rgb(255, 76, 81, 0.16)',
              mainOpacity: 'rgb(255, 76, 81, 0.24)',
              darkOpacity: 'rgb(255, 76, 81, 0.32)',
              darkerOpacity: 'rgb(255, 76, 81, 0.38)',
            },
            warning: {
              main: '#FFB400',
              light: '#FFC333',
              dark: '#E6A200',
              contrastText: '#fff',
              lighterOpacity: 'rgb(255, 180, 0, 0.08)',
              lightOpacity: 'rgb(255, 180, 0, 0.16)',
              mainOpacity: 'rgb(255, 180, 0, 0.24)',
              darkOpacity: 'rgb(255, 180, 0, 0.32)',
              darkerOpacity: 'rgb(255, 180, 0, 0.38)',
            },
            info: {
              main: '#16B1FF',
              light: '#45C1FF',
              dark: '#149FE6',
              contrastText: '#fff',
              lighterOpacity: 'rgb(22, 177, 255, 0.08)',
              lightOpacity: 'rgb(22, 177, 255, 0.16)',
              mainOpacity: 'rgb(22, 177, 255, 0.24)',
              darkOpacity: 'rgb(22, 177, 255, 0.32)',
              darkerOpacity: 'rgb(22, 177, 255, 0.38)',
            },
            success: {
              main: '#56CA00',
              light: '#78D533',
              dark: '#4DB600',
              contrastText: '#fff',
              lighterOpacity: 'rgb(86, 202, 0, 0.08)',
              lightOpacity: 'rgb(86, 202, 0, 0.16)',
              mainOpacity: 'rgb(86, 202, 0, 0.24)',
              darkOpacity: 'rgb(86, 202, 0, 0.32)',
              darkerOpacity: 'rgb(86, 202, 0, 0.38)',
            },
            background: {
              default: '#F4F5FA',
              paper: '#FFFFFF',
            },
            text: {
              primary: 'rgb(46, 38, 61, 0.9)',
              secondary: 'rgb(46, 38, 61, 0.7)',
              disabled: 'rgb(46, 38, 61, 0.4)',
            },
            divider: 'rgb(46, 38, 61, 0.12)',
            customColors: {
              bodyBg: '#F4F5FA',
              chatBg: '#F7F6FA',
              greyLightBg: '#FAFAFA',
              inputBorder: 'rgb(46, 38, 61, 0.22)',
              tableHeaderBg: '#F6F7FB',
              tooltipText: '#FFFFFF',
              trackBg: '#F0F2F8'
            }
          }
        : {
            // Dark mode colors - Aligned with Materio
            primary: {
              main: '#8C57FF',
              light: '#A379FF',
              dark: '#7E4EE6',
              contrastText: '#fff',
              lighterOpacity: 'rgb(140, 87, 255, 0.08)',
              lightOpacity: 'rgb(140, 87, 255, 0.16)',
              mainOpacity: 'rgb(140, 87, 255, 0.24)',
              darkOpacity: 'rgb(140, 87, 255, 0.32)',
              darkerOpacity: 'rgb(140, 87, 255, 0.38)',
            },
            secondary: {
              main: '#8A8D93',
              light: '#A1A4A9',
              dark: '#7C7F84',
              contrastText: '#fff',
              lighterOpacity: 'rgb(138, 141, 147, 0.08)',
              lightOpacity: 'rgb(138, 141, 147, 0.16)',
              mainOpacity: 'rgb(138, 141, 147, 0.24)',
              darkOpacity: 'rgb(138, 141, 147, 0.32)',
              darkerOpacity: 'rgb(138, 141, 147, 0.38)',
            },
            error: {
              main: '#FF4C51',
              light: '#FF7074',
              dark: '#E64449',
              contrastText: '#fff',
              lighterOpacity: 'rgb(255, 76, 81, 0.08)',
              lightOpacity: 'rgb(255, 76, 81, 0.16)',
              mainOpacity: 'rgb(255, 76, 81, 0.24)',
              darkOpacity: 'rgb(255, 76, 81, 0.32)',
              darkerOpacity: 'rgb(255, 76, 81, 0.38)',
            },
            warning: {
              main: '#FFB400',
              light: '#FFC333',
              dark: '#E6A200',
              contrastText: '#fff',
              lighterOpacity: 'rgb(255, 180, 0, 0.08)',
              lightOpacity: 'rgb(255, 180, 0, 0.16)',
              mainOpacity: 'rgb(255, 180, 0, 0.24)',
              darkOpacity: 'rgb(255, 180, 0, 0.32)',
              darkerOpacity: 'rgb(255, 180, 0, 0.38)',
            },
            info: {
              main: '#16B1FF',
              light: '#45C1FF',
              dark: '#149FE6',
              contrastText: '#fff',
              lighterOpacity: 'rgb(22, 177, 255, 0.08)',
              lightOpacity: 'rgb(22, 177, 255, 0.16)',
              mainOpacity: 'rgb(22, 177, 255, 0.24)',
              darkOpacity: 'rgb(22, 177, 255, 0.32)',
              darkerOpacity: 'rgb(22, 177, 255, 0.38)',
            },
            success: {
              main: '#56CA00',
              light: '#78D533',
              dark: '#4DB600',
              contrastText: '#fff',
              lighterOpacity: 'rgb(86, 202, 0, 0.08)',
              lightOpacity: 'rgb(86, 202, 0, 0.16)',
              mainOpacity: 'rgb(86, 202, 0, 0.24)',
              darkOpacity: 'rgb(86, 202, 0, 0.32)',
              darkerOpacity: 'rgb(86, 202, 0, 0.38)',
            },
            background: {
              default: '#28243D',
              paper: '#312D4B',
            },
            text: {
              primary: 'rgb(231, 227, 252, 0.9)',
              secondary: 'rgb(231, 227, 252, 0.7)',
              disabled: 'rgb(231, 227, 252, 0.4)',
            },
            divider: 'rgb(231, 227, 252, 0.12)',
            customColors: {
              bodyBg: '#28243D',
              chatBg: '#373452',
              greyLightBg: '#373350',
              inputBorder: 'rgb(231, 227, 252, 0.22)',
              tableHeaderBg: '#3D3759',
              tooltipText: '#312D4B',
              trackBg: '#474360'
            }
          }),
    },
    typography: {
      fontFamily: inter.style.fontFamily,
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
        letterSpacing: '0.01em',
      },
      subtitle2: {
        fontWeight: 500,
        letterSpacing: '0.01em',
      },
      body1: {
        letterSpacing: '0.01em',
      },
      body2: {
        letterSpacing: '0.01em',
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
      }
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 8px rgba(0, 0, 0, 0.08)',
      '0px 6px 12px rgba(0, 0, 0, 0.1)',
      '0px 8px 16px rgba(0, 0, 0, 0.12)',
      '0px 10px 20px rgba(0, 0, 0, 0.15)',
      '0px 12px 24px rgba(0, 0, 0, 0.18)',
      '0px 14px 28px rgba(0, 0, 0, 0.2)',
      '0px 16px 32px rgba(0, 0, 0, 0.22)',
      '0px 18px 36px rgba(0, 0, 0, 0.25)',
      '0px 20px 40px rgba(0, 0, 0, 0.28)',
      '0px 22px 44px rgba(0, 0, 0, 0.3)',
      '0px 24px 48px rgba(0, 0, 0, 0.32)',
      '0px 26px 52px rgba(0, 0, 0, 0.35)',
      '0px 28px 56px rgba(0, 0, 0, 0.38)',
      '0px 30px 60px rgba(0, 0, 0, 0.4)',
      '0px 32px 64px rgba(0, 0, 0, 0.42)',
      '0px 34px 68px rgba(0, 0, 0, 0.45)',
      '0px 36px 72px rgba(0, 0, 0, 0.48)',
      '0px 38px 76px rgba(0, 0, 0, 0.5)',
      '0px 40px 80px rgba(0, 0, 0, 0.52)',
      '0px 42px 84px rgba(0, 0, 0, 0.55)',
      '0px 44px 88px rgba(0, 0, 0, 0.58)',
      '0px 46px 92px rgba(0, 0, 0, 0.6)',
      '0px 48px 96px rgba(0, 0, 0, 0.62)',
    ] as unknown as Shadows,
    components: {},
  });

  // Create the theme with all options
  const theme = createTheme(getDesignTokens(mode));

  // Make typography responsive
  const responsiveTheme = responsiveFontSizes(theme);

  return responsiveTheme;
};

export default createLandingTheme;
