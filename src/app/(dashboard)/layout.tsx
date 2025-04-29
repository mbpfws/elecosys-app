'use client'

// React Imports
import type { ReactNode } from 'react'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import LayoutContent from '@layouts/components/vertical/LayoutContent'
import VerticalNav from '@menu/vertical-menu'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

// Styled Component Imports
import StyledContentWrapper from '@layouts/styles/vertical/StyledContentWrapper'

// Navigation Data Import
import { navigationItems } from '@/configs/navigation/vertical'

type VerticalLayoutProps = ChildrenType & {
  navbar?: ReactNode
  footer?: ReactNode
}

const DashboardLayout = (props: VerticalLayoutProps) => {
  // Props
  const { navbar, footer, children } = props

  return (
    <div className={classnames(verticalLayoutClasses.root, 'flex flex-auto')}>
      <VerticalNav navItems={navigationItems} />
      <StyledContentWrapper
        className={classnames(verticalLayoutClasses.contentWrapper, 'flex flex-col min-is-0 is-full')}
      >
        {navbar || null}
        {/* Content */}
        <LayoutContent>{children}</LayoutContent>
        {footer || null}
      </StyledContentWrapper>
    </div>
  )
}

export default DashboardLayout
