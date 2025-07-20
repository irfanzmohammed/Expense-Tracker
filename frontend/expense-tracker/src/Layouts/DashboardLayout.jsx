import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import SideMenu from './SideMenu'
import Navbar from './Navbar'

const DashboardLayout = ({children,activeMenu}) => {
    const {user}=useContext(UserContext)
    return (
        <div>
        <Navbar activeMenu={activeMenu}/>
         {/* {user&&(  */}
     <div className='flex'>
        <div className='block max-[1080px]:hidden'>
        <SideMenu />
        </div>
        {/* Main content area */}
        <div className='grow mx-5'>{children}</div>
     </div>
      
      </div>
     
    )
  }

export default DashboardLayout