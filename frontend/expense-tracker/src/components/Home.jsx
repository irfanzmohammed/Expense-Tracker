import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuChevronUp, LuChevronDown } from "react-icons/lu";
import { UserContext } from '../context/UserContext';

const Home = () => {

    const navigate=useNavigate();
    const { user } = useContext(UserContext)
     useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true }); // block access if already logged in
    }
  }, [user, navigate]);

    const Accordion=({title,content})=>{
        const[isOpen,setIsOpen]=useState(false);
    return(
      <div className=' w-[55%] '>
        <button className='w-full flex justify-between p-4 cursor-pointer '
        onClick={()=>setIsOpen(!isOpen)}>
          <span className='font-semibold'>{title}</span>
         <span>{isOpen ? <LuChevronUp
         className='text-gray-400' /> : <LuChevronDown
         className='text-gray-400' />}</span>
        </button>
      {isOpen && <div className='p-2 px-4 text-gray-400 '>{content}</div>}
      </div>
    )
  }
  return (
    <div className='flex flex-col items-center'>
      <h2 className='heading-font text-white text-6xl text-center font-extrabold my-14 font-sans'>Track your spending <br/> with insights!</h2>

        <button className='bg-gray-300 text-black font-medium rounded-md p-4'type='submit'
        onClick={()=>navigate('/auth')}
         >Get Started</button>
    
      <img src="/et_bannerimage.png" alt="banner" className=' w-1/2 h-auto py-11'/>
     
      {/* <h3 className='text-white font-bold'>FAQs</h3> */}
      <div className='flex flex-col items-center  w-full  '>
      <Accordion title=" What can I do with this Expense Tracker app?"
       content=" Track, categorize, and manage your income and expenses. Download your data as an Excel file."/>
      <Accordion title="  How does the app help with financial insights?" content=" It shows charts and graphs to help you understand your spending and income trends."/>
      <Accordion title=' Is my data safe and accessible anytime?' content='Yes, your data is secure and available after login from any device.'/>      
      </div>
      </div>

  )
}

export default Home