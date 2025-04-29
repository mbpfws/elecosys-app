'use client'

import { ReactNode } from 'react'
import { Box, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname()
  
  // Generate breadcrumbs based on the current path
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} href="/" color="inherit">
          Home
        </MuiLink>
        {paths.map((path, index) => {
          const routeTo = `/${paths.slice(0, index + 1).join('/')}`
          const isLast = index === paths.length - 1
          
          return isLast ? (
            <Typography color="text.primary" key={path}>
              {path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')}
            </Typography>
          ) : (
            <MuiLink component={Link} href={routeTo} color="inherit" key={path}>
              {path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')}
            </MuiLink>
          )
        })}
      </Breadcrumbs>
    )
  }
  
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {generateBreadcrumbs()}
      
      {children}
    </Box>
  )
}

export default AdminLayout
