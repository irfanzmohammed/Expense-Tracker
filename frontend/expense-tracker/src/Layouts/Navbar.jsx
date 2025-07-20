import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';
const Navbar = ({activeMenu}) => {
    const [openSideMenu,setopenSideMenu]=useState(false);
  return (
    <div className='flex gap-5 bg-gray-950  border-b border-gray-800/50  backdrop-blur-[2px]  py-4 px-4 sticky top-0 left-0 z-30'>
     <button className='block text-gray-300 lg:hidden '
     onClick={()=>{
        setopenSideMenu(!openSideMenu)
     }}>
     {openSideMenu ?(<HiOutlineX className='text-2xl'/>):
     (<HiOutlineMenu className='text-2xl'/>)
     }   
     </button>
    {
    openSideMenu &&(
    <div className='fixed  top-[61px] text-gray-300 '>
        <SideMenu activeMenu={activeMenu}/>
    </div>
    )
    }
    </div>
  )
}

export default Navbar