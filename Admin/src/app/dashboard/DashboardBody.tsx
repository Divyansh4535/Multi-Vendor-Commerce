import { getToken } from '@/lib/token'
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'

const DashboardBody = ({ children }: { children: React.ReactNode }) => {
  const validToken = getToken()

  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default DashboardBody