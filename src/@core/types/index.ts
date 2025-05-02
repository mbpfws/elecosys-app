// React Imports
import type { ReactNode } from 'react'

// Type Imports
import type { Theme } from '@mui/material/styles'

export type Direction = 'ltr' | 'rtl'
export type Skin = 'default' | 'bordered'
export type Mode = 'light' | 'dark' | 'system'
export type SystemMode = 'light' | 'dark'
export type Layout = 'vertical' | 'horizontal' | 'collapsed'
export type LayoutComponentType = 'navbar' | 'content' | 'footer'
export type NavbarType = 'floating' | 'sticky' | 'static' | 'hidden'
export type ContentWidth = 'compact' | 'wide'

export type ChildrenType = {
  children: ReactNode
}

export type ThemeType = Theme & {
  direction: Direction
  breakpoints: Theme['breakpoints'] & {
    values: {
      xs: number
      sm: number
      md: number
      lg: number
      xl: number
    }
  }
  components: Theme['components'] & {
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: string
          backgroundImage: string
        }
      }
    }
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: string
        }
      }
    }
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: string
        }
      }
    }
  }
  typography: Theme['typography'] & {
    h1: {
      fontWeight: number
      letterSpacing: string
      lineHeight: number
    }
    h2: {
      fontWeight: number
      letterSpacing: string
      lineHeight: number
    }
    h3: {
      fontWeight: number
      lineHeight: number
      letterSpacing: string
    }
    h4: {
      fontWeight: number
      lineHeight: number
      letterSpacing: string
    }
    h5: {
      fontWeight: number
      lineHeight: number
      letterSpacing: string
    }
    h6: {
      fontWeight: number
      lineHeight: number
      letterSpacing: string
    }
    body1: {
      letterSpacing: string
    }
    body2: {
      letterSpacing: string
    }
    subtitle1: {
      letterSpacing: string
    }
    subtitle2: {
      letterSpacing: string
    }
    button: {
      letterSpacing: string
    }
    caption: {
      letterSpacing: string
    }
    overline: {
      letterSpacing: string
    }
  }
  shadows: string[]
}

export type Settings = {
  skin: Skin
  mode: Mode
  direction: Direction
  layout: Layout
  navbarType: NavbarType
  contentWidth: ContentWidth
  disableRipple: boolean
  navigationSize: number
  navbarScrolled: boolean
  disableCustomizer: boolean
  semiDark: boolean
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
}

export type NavLink = {
  path?: string
  title: string
  icon?: string | ReactNode
  badgeContent?: string
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  disabled?: boolean
  external?: boolean
  openInNewTab?: boolean
  action?: () => void
  subject?: string
  children?: NavLink[]
}

export type NavSectionTitle = {
  sectionTitle: string
  action?: string
  subject?: string
}

export type VerticalNavItemsType = (NavLink | NavSectionTitle)[]
export type HorizontalNavItemsType = NavLink[]

export type NavGroup = {
  icon: string | ReactNode
  title: string
  badgeContent?: string
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  children: NavLink[]
}
