'use client'

import { useAuth } from '@/contexts/AuthContext'

export function useRole() {
  const { userRole } = useAuth()
  
  return {
    role: userRole,
    isAdmin: userRole === 'admin',
    isTeacher: userRole === 'teacher',
    isUser: userRole === 'user',
    hasRole: (role: string) => userRole === role,
    hasAnyRole: (roles: string[]) => roles.includes(userRole || '')
  }
}
