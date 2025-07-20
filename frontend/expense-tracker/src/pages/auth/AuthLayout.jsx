import React from 'react'
import { useState } from 'react';
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
const AuthLayout = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='mt-16 gap-6 flex flex-col items-center'>
      {/* <h1 className=' text-5xl font-extrabold  '>
        {searchParams.get("createNew")?"Hold up! Let's login first..."
        :"Login / SignUp"}</h1> */}
       <div className='grid grid-cols-2 bg-gray-700 rounded-lg w-1/3  text-center'>
       <button onClick={()=>setIsLogin(true)} className={`py-2  rounded-md 
         ${isLogin ? "bg-gray-700 w-2/3 mx-auto text-white text-center ":"bg-black border-2 border-gray-700  text-white text-center"}`}>Login
        </button>
        <button onClick={()=>setIsLogin(false)} className={`py-2 px-2 rounded-md 
         ${!isLogin ? "bg-gray-700 w-2/3 mx-auto text-white text-center ":"bg-black text-center border-2 border-gray-700 text-white"}`}>Signup
        </button>
       </div>
        {isLogin ? <Login/> : <SignUp/>}
    </div>
  )
}

export default AuthLayout