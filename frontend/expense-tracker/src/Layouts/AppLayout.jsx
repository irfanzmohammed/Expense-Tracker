import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
const AppLayout = () => {
  return (
    <div className=' dark:bg-gray-950  dark:text-white min-h-screen flex flex-col '>
        <Header/>
        <main  className='flex-1'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default AppLayout