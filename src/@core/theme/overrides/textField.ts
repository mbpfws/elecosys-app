// MUI Imports
import type { Theme } from '@mui/material/styles'

const MuiTextField = (theme: Theme) => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, 12px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.75)'
            }
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& .MuiOutlinedInput-input': {
              padding: '12px 14px'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2
            }
          }
        }
      }
    }
  }
}

export default MuiTextField
