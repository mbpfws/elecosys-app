// MUI Imports
import type { Theme } from '@mui/material/styles'

const MuiButton = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: `${theme.spacing(1.75)} ${theme.spacing(3)}`
        },
        contained: {
          boxShadow: theme.shadows[3],
          '&:hover': {
            boxShadow: theme.shadows[4]
          }
        },
        outlined: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        sizeSmall: {
          padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`
        },
        sizeLarge: {
          padding: `${theme.spacing(2)} ${theme.spacing(4)}`
        }
      }
    }
  }
}

export default MuiButton
