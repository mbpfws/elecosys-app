'use client'

import BlankLayout from '@layouts/BlankLayout'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BlankLayout>{children}</BlankLayout>
}
