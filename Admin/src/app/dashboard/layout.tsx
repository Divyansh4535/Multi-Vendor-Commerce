"use client"
import React from 'react'
import { ThemeProvider } from '@/Components/theme-provider'
import DashboardLayout from '@/Components/Layout/dashboard-layout'
import DashboardBody from './DashboardBody'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <DashboardLayout>
        <DashboardBody>{children}</DashboardBody>
      </DashboardLayout>
    </ThemeProvider>
  )
}

export default RootLayout