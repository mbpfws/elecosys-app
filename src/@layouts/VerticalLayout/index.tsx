'use client'

// React Imports
import { ReactNode, useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

// Icon Imports
import MenuIcon from '@mui/icons-material/Menu'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import VerticalNav from '@menu/vertical-menu'

// Config Imports
import themeConfig from '@configs/themeConfig'
import navigation from '@configs/navigation/vertical'

interface VerticalLayoutProps {
  children: ReactNode
  systemMode?: SystemMode
}

const drawerWidth = themeConfig.navigationSize

const VerticalLayout = (props: VerticalLayoutProps) => {
  // Props
  const { children } = props

  // States
  const [mobileOpen, setMobileOpen] = useState(false)

  // Handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }



  // Drawer content
  const drawer = (
    <Box>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" noWrap component="div">
          IELTS Platform
        </Typography>
      </Box>
      <Divider />
      <VerticalNav navItems={navigation} />
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AI-Powered Social Learning Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8 // To account for the AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default VerticalLayout
