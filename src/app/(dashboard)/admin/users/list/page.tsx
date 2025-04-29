'use client'

import { 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'

// Mock data for users
const users = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'Student', 
    status: 'Active', 
    lastLogin: '2025-04-29T10:30:00Z' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'Student', 
    status: 'Active', 
    lastLogin: '2025-04-28T15:45:00Z' 
  },
  { 
    id: 3, 
    name: 'Admin User', 
    email: 'admin@example.com', 
    role: 'Admin', 
    status: 'Active', 
    lastLogin: '2025-04-30T08:15:00Z' 
  },
  { 
    id: 4, 
    name: 'Inactive User', 
    email: 'inactive@example.com', 
    role: 'Student', 
    status: 'Inactive', 
    lastLogin: '2025-03-15T11:20:00Z' 
  }
]

const UserListPage = () => {
  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" component="h2">
              User Management
            </Typography>
            <TextField
              placeholder="Search users..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                        {user.name}
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={user.role === 'Admin' ? 'secondary' : 'default'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        color={user.status === 'Active' ? 'success' : 'error'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        component={Link} 
                        href={`/admin/users/view/${user.id}`}
                        aria-label="view user"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton aria-label="edit user">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default UserListPage
