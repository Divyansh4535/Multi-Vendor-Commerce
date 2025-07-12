"use client"
import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../redux/store'; // adjust the path based on your file structure
import { Header } from '../Header/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar)
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false)

  
  return (
    <main className='w-full min-h-screen flex '>
      <Sidebar />
      <aside
        className={`
        w-full h-full  bg-gray-50 dark:bg-[#020d1a] transition-all duration-300  ${isMobile ? "" : isOpen ? "" : ""}
        `}
      >
        <Header />
        <div
          className={`w-full overflow-hidden py-4  ${isMobile ? "px-4" : "px-6"}`}
        >
          {children}
        </div>
      </aside>
    </main>
  )
}

export default DashboardLayout