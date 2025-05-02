'use client'

import { ReactNode } from 'react'

// Layout Import
import VerticalLayout from '@layouts/VerticalLayout'

interface DashboardLayoutWrapperProps {
  children: ReactNode
}

const DashboardLayoutWrapper = ({ children }: DashboardLayoutWrapperProps) => {
  return <VerticalLayout>{children}</VerticalLayout>
}

export default DashboardLayoutWrapper
