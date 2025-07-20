import React from 'react'
import { LuTrendingUp } from 'react-icons/lu'
const Header = () => {
  return (
    <div className=" heading-font text-lg font-medium text-white p-4 flex">
     Expense Tracker <LuTrendingUp
     className='mt-2 text-md' />
    </div>
  )
}

export default Header