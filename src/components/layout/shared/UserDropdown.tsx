'use client'

import { useState } from 'react'
import { 
  Avatar, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Typography
} from '@mui/material'
import { 
  AccountCircle, 
  Settings, 
  Logout, 
  ExpandMore 
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useAppSelector } from '@/redux-store'
import { useTranslation } from '@/utils/i18n'

const UserDropdown = () => {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()
  const { displayName, avatarUrl } = useAppSelector(state => state.auth)
  const router = useRouter()
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = () => {
    setAnchorEl(null)
  }
  
  const handleLogout = async () => {
    handleClose()
    await signOut()
  }
  
  const handleProfileClick = () => {
    handleClose()
    router.push('/pages/account-settings')
  }
  
  // If no user is logged in, don't render the dropdown
  if (!user) return null
  
  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ ml: 2 }}
      >
        {avatarUrl ? (
          <Avatar src={avatarUrl} alt={displayName || user.email || 'User'} />
        ) : (
          <Avatar>{displayName?.charAt(0) || user.email?.charAt(0) || 'U'}</Avatar>
        )}
        <ExpandMore sx={{ ml: 0.5 }} />
      </IconButton>
      
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {displayName || user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('common.profile')}</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('common.settings')}</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('common.logout')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserDropdown
