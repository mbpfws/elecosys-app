// MUI Imports
import type { Theme } from '@mui/material/styles'

// Overrides Imports
import MuiButton from './button'
import MuiCard from './card'
import MuiTextField from './textField'
import MuiPaper from './paper'

const componentsOverride = (theme: Theme) => {
  return Object.assign(
    MuiButton(theme),
    MuiCard(theme),
    MuiTextField(theme),
    MuiPaper(theme)
  )
}

export default componentsOverride
