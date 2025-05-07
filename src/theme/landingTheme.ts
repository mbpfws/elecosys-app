// MUI Imports
import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Define the theme interface
interface CustomTheme {
  customShadows: {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    card: string;
    cardHover: string;
    buttonHover: string;
    z1: string;
    z2: string;
    z3: string;
  };
  customGradients: {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    purple: string;
    blue: string;
    orange: string;
    green: string;
    dark: string;
    light: string;
  };
  customAnimations: {
    fast: string;
    medium: string;
    slow: string;
  };
}

// Create the theme
export const createLandingTheme = (mode: PaletteMode) => {
  // Define colors based on mode
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode colors
            primary: {
              main: '#8C57FF',
              light: '#A379FF',
              dark: '#7E4EE6',
              contrastText: '#fff',
            },
            secondary: {
              main: '#FF7A50',
              light: '#FF9B7B',
              dark: '#E66A45',
              contrastText: '#fff',
            },
            background: {
              default: '#F4F5FA',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#2A2A42',
              secondary: '#65657B',
            },
            divider: 'rgba(42, 42, 66, 0.12)',
          }
        : {
            // Dark mode colors
            primary: {
              main: '#8C57FF',
              light: '#A379FF',
              dark: '#7E4EE6',
              contrastText: '#fff',
            },
            secondary: {
              main: '#FF7A50',
              light: '#FF9B7B',
              dark: '#E66A45',
              contrastText: '#fff',
            },
            background: {
              default: '#151525',
              paper: '#1E1E35',
            },
            text: {
              primary: '#E7E7FF',
              secondary: '#B0B0CC',
            },
            divider: 'rgba(231, 231, 255, 0.12)',
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
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
      borderRadius: 12,
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
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '12px',
            padding: '10px 24px',
            transition: 'all 0.3s ease',
            fontWeight: 600,
          },
          contained: {
            boxShadow: mode === 'light' 
              ? '0px 8px 16px rgba(140, 87, 255, 0.2)' 
              : '0px 8px 16px rgba(140, 87, 255, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' 
                ? '0px 12px 20px rgba(140, 87, 255, 0.3)' 
                : '0px 12px 20px rgba(140, 87, 255, 0.4)',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            transition: 'all 0.3s ease',
            boxShadow: mode === 'light' 
              ? '0px 8px 24px rgba(0, 0, 0, 0.08)' 
              : '0px 8px 24px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: mode === 'light' 
                ? '0px 16px 32px rgba(0, 0, 0, 0.12)' 
                : '0px 16px 32px rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
    },
  });

  // Create the base theme
  let theme = createTheme(getDesignTokens(mode));

  // Add custom properties
  theme = createTheme(theme, {
    customShadows: {
      primary: `0px 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
      secondary: `0px 8px 24px ${alpha(theme.palette.secondary.main, 0.25)}`,
      info: `0px 8px 24px ${alpha(theme.palette.info.main, 0.25)}`,
      success: `0px 8px 24px ${alpha(theme.palette.success.main, 0.25)}`,
      warning: `0px 8px 24px ${alpha(theme.palette.warning.main, 0.25)}`,
      error: `0px 8px 24px ${alpha(theme.palette.error.main, 0.25)}`,
      card: mode === 'light' 
        ? '0px 8px 24px rgba(0, 0, 0, 0.08)' 
        : '0px 8px 24px rgba(0, 0, 0, 0.2)',
      cardHover: mode === 'light' 
        ? '0px 16px 32px rgba(0, 0, 0, 0.12)' 
        : '0px 16px 32px rgba(0, 0, 0, 0.3)',
      buttonHover: `0px 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
      z1: mode === 'light' 
        ? '0px 4px 12px rgba(0, 0, 0, 0.06)' 
        : '0px 4px 12px rgba(0, 0, 0, 0.2)',
      z2: mode === 'light' 
        ? '0px 8px 24px rgba(0, 0, 0, 0.08)' 
        : '0px 8px 24px rgba(0, 0, 0, 0.25)',
      z3: mode === 'light' 
        ? '0px 16px 32px rgba(0, 0, 0, 0.1)' 
        : '0px 16px 32px rgba(0, 0, 0, 0.3)',
    },
    customGradients: {
      primary: 'linear-gradient(135deg, #8C57FF 0%, #A379FF 100%)',
      secondary: 'linear-gradient(135deg, #FF7A50 0%, #FF9B7B 100%)',
      info: 'linear-gradient(135deg, #16B1FF 0%, #45C1FF 100%)',
      success: 'linear-gradient(135deg, #56CA00 0%, #78D533 100%)',
      warning: 'linear-gradient(135deg, #FFB400 0%, #FFC333 100%)',
      error: 'linear-gradient(135deg, #FF4C51 0%, #FF7074 100%)',
      purple: 'linear-gradient(135deg, #8C57FF 0%, #C18FFF 100%)',
      blue: 'linear-gradient(135deg, #2196F3 0%, #4DABF5 100%)',
      orange: 'linear-gradient(135deg, #FF7A50 0%, #FFB088 100%)',
      green: 'linear-gradient(135deg, #4CAF50 0%, #7BC67E 100%)',
      dark: 'linear-gradient(135deg, #1E1E35 0%, #2D2D4A 100%)',
      light: 'linear-gradient(135deg, #F4F5FA 0%, #FFFFFF 100%)',
    },
    customAnimations: {
      fast: '0.2s ease',
      medium: '0.3s ease',
      slow: '0.5s ease',
    },
  } as any);

  // Make typography responsive
  theme = responsiveFontSizes(theme);

  return theme;
};

export default createLandingTheme;
