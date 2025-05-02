// MUI Imports
import type { Theme } from '@mui/material/styles'

const MuiPaper = (theme: Theme) => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12
        },
        elevation1: {
          boxShadow: theme.shadows[1]
        },
        elevation2: {
          boxShadow: theme.shadows[2]
        },
        elevation3: {
          boxShadow: theme.shadows[3]
        },
        elevation4: {
          boxShadow: theme.shadows[4]
        },
        elevation5: {
          boxShadow: theme.shadows[5]
        }
      }
    }
  }
}

export default MuiPaper
