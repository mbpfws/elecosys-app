// MUI Imports
import type { Theme } from '@mui/material/styles'

const MuiCard = (theme: Theme) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[3],
          borderRadius: 12,
          '& .MuiCardHeader-root': {
            padding: theme.spacing(4),
            '& + .MuiCardContent-root, & + .MuiCollapse-root .MuiCardContent-root': {
              paddingTop: 0
            }
          },
          '& .MuiCardContent-root': {
            padding: theme.spacing(4)
          },
          '& .MuiCardActions-root': {
            padding: theme.spacing(4),
            '&.MuiCardActions-spacing > :not(:first-of-type)': {
              marginLeft: theme.spacing(2)
            }
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: theme.spacing(4),
          '& .MuiCardHeader-title': {
            fontSize: '1.125rem',
            lineHeight: 1.4,
            fontWeight: 600
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(4),
          '&:last-child': {
            paddingBottom: theme.spacing(4)
          }
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(4)
        }
      }
    }
  }
}

export default MuiCard
