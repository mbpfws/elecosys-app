'use client'

import { ReactNode } from 'react'

// Layout Import
import BlankLayout from '@layouts/BlankLayout'

interface BlankLayoutWrapperProps {
  children: ReactNode
}

const BlankLayoutWrapper = ({ children }: BlankLayoutWrapperProps) => {
  return <BlankLayout>{children}</BlankLayout>
}

export default BlankLayoutWrapper
