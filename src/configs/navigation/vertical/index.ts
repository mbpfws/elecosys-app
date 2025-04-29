// Type Imports
import type { VerticalMenuDataType } from '@menu/types'
import type { getDictionary } from '@/utils/getDictionary'

export const navigationItems = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => [
  // Dashboard
  {
    label: dictionary['navigation'].dashboard || 'Dashboard',
    icon: 'ri-home-smile-line',
    href: '/'
  },
  
  // AI Mini-Apps Section
  {
    label: dictionary['navigation'].aiMiniApps || 'AI Mini-Apps',
    isSection: true,
    children: [
      // Writing Tools
      {
        label: dictionary['navigation'].writingTools || 'IELTS Writing Tools',
        icon: 'ri-edit-line',
        href: '/writing-tools'
      },
      // Adaptive Test
      {
        label: dictionary['navigation'].adaptiveTest || 'IELTS Adaptive Test',
        icon: 'ri-file-list-3-line',
        href: '/new-ielts-adaptive'
      },
      // AI Tutor Chat
      {
        label: dictionary['navigation'].aiTutor || 'AI Tutor Chat',
        icon: 'ri-chat-3-line',
        href: '/chat'
      }
    ]
  },
  
  // User Section
  {
    label: dictionary['navigation'].userSection || 'User',
    isSection: true,
    children: [
      // Account Settings
      {
        label: dictionary['navigation'].accountSettings || 'Account Settings',
        icon: 'ri-user-settings-line',
        href: '/pages/account-settings'
      }
    ]
  },
  
  // Admin Section (will be conditionally displayed based on user role)
  {
    label: dictionary['navigation'].adminSection || 'Administration',
    isSection: true,
    children: [
      // User Management
      {
        label: dictionary['navigation'].userManagement || 'User Management',
        icon: 'ri-user-line',
        children: [
          {
            label: dictionary['navigation'].userList || 'User List',
            href: '/admin/users/list'
          },
          {
            label: dictionary['navigation'].userView || 'User Details',
            href: '/admin/users/view'
          }
        ]
      },
      // Usage Statistics
      {
        label: dictionary['navigation'].usageStats || 'Usage Statistics',
        icon: 'ri-bar-chart-box-line',
        href: '/admin/stats'
      },
      // Content Management
      {
        label: dictionary['navigation'].contentManagement || 'Content Management',
        icon: 'ri-settings-line',
        href: '/admin/content-management'
      }
    ]
  }
]
