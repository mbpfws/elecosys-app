'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'

// Icon Imports
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Type Imports
import type { VerticalNavItemsType, NavLink, NavSectionTitle } from '@core/types'

interface VerticalNavProps {
  navItems: VerticalNavItemsType
}

const VerticalNav = (props: VerticalNavProps) => {
  // Props
  const { navItems } = props

  // States
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  // Hooks
  const pathname = usePathname()

  // Handlers
  const handleItemClick = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Check if an item is active
  const isActive = (path?: string) => {
    if (!path) return false
    return pathname === path
  }

  // Render nav items
  const renderNavItems = (items: VerticalNavItemsType, level = 0) => {
    return items.map((item, index) => {
      // Section title
      if ('sectionTitle' in item) {
        const sectionTitle = item as NavSectionTitle

        return (
          <ListSubheader
            key={`${sectionTitle.sectionTitle}-${index}`}
            disableSticky
            sx={{
              py: 2,
              px: 4,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'text.secondary',
              backgroundColor: 'transparent',
              lineHeight: 1.5
            }}
          >
            {sectionTitle.sectionTitle}
          </ListSubheader>
        )
      }

      // Nav link
      const navLink = item as NavLink

      // Check if item has children
      if (navLink.children && navLink.children.length) {
        const isOpen = openItems[navLink.title] || false

        return (
          <Box key={`${navLink.title}-${index}`}>
            <ListItem
              button
              onClick={() => handleItemClick(navLink.title)}
              sx={{
                py: 2,
                px: level > 0 ? 8 : 4,
                backgroundColor: isOpen ? 'action.hover' : 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              {navLink.icon && <ListItemIcon>{navLink.icon}</ListItemIcon>}
              <ListItemText primary={navLink.title} />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavItems(navLink.children, level + 1)}
              </List>
            </Collapse>
          </Box>
        )
      }

      // Regular nav item
      return (
        <ListItem
          key={`${navLink.title}-${index}`}
          button
          component={Link}
          href={navLink.path || '#'}
          sx={{
            py: 2,
            px: level > 0 ? 8 : 4,
            backgroundColor: isActive(navLink.path) ? 'action.selected' : 'transparent',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          {navLink.icon && <ListItemIcon>{navLink.icon}</ListItemIcon>}
          <ListItemText primary={navLink.title} />
        </ListItem>
      )
    })
  }

  return <List sx={{ py: 2 }}>{renderNavItems(navItems)}</List>
}

export default VerticalNav
