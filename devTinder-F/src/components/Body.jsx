import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* This grows to take up available space */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default Body
