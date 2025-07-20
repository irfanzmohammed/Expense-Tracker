import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { validateForm } from '../../utils/validateSignUp';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';

const SignUp = () => {
  const navigate=useNavigate();
    const[showPassword,setShowPassword]=useState(false);
    const[errors,setErrors]=useState({});
    const {user,updateUser}=useContext(UserContext)
    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
      }
      );
     
      // Redirect to dashboard if signed up
      useEffect(()=>{
        if(user){
          navigate('/dashboard',{replace:true})
        }
      },[user,navigate])

       const handleInputChange=(e)=>{
        const {name,value}= e.target;
        setFormData((prevState)=>({
          ...prevState,
          [name]:value,
        }));
       }

       const handleSignUp=async()=>{
        const {name,email,password}=formData
        console.log("API URL:", import.meta.env.VITE_REACT_APP_SIGN_UP); 
       try {
       const response = await axios.post(import.meta.env.VITE_REACT_APP_SIGN_UP, 
       {name,
       email,
       password},
        { withCredentials: true }
       );

     console.log(response.data);

     if (response.data) {
      updateUser(response.data.user);
      navigate("/dashboard");
     }
    } 
    catch (error) {
    console.error("Error signing up:", error);
     }
    }

       const handleSubmit=async(e)=>{
        e.preventDefault();
        const validateErrors=validateForm(formData);
        setErrors(validateErrors);
        if(Object.keys(validateErrors).length === 0){
            console.log("form submitted");
        }
       await handleSignUp();
       }


  return (
    <div className='flex items-center '>
        <form className='border border-gray-500 rounded-md  w-96' onSubmit={handleSubmit}>
        
        <h3 className='text-xl px-12 mt-4'>Signup</h3>
        <p className='px-12 text-sm text-gray-400 mb-4'>Create a new account if you haven't already</p>
    
       
        <div className='flex flex-col items-center '>
        <input 
        type="text"
        name="name"
        value={formData.name}
        placeholder="Enter your name"
        className='w-3/4 rounded-md p-2  mb-4 m border border-gray-500'
        onChange={handleInputChange}
       />
       <div className='mt-0 w-full ml-26'>
       {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
       </div>
       

       <input 
        type="email"
        name="email"
        value={formData.email}
        placeholder="Enter Email"
        className='w-3/4 rounded-md p-2  mb-4 m border border-gray-500'
        onChange={handleInputChange}
       />
       <div className='mt-0 w-full ml-26'>
       {errors.email && <p className="text-red-500 text-xs mb-4">{errors.email}</p>}
       </div>

       <div className='w-3/4 relative'>
           <input 
           type={showPassword?"text":"password"}
           placeholder="Enter Password"
           name="password"
           className='w-full rounded-md mb-4 p-2 border border-gray-500'
           onChange={handleInputChange}
           />
           <span className="absolute right-3 top-1/4  text-gray-400"
           onClick={()=>setShowPassword(!showPassword)}>
           {showPassword ? <FaEyeSlash size={20}/>:<FaEye size={20}/>}
           </span>
           </div>
        <div  className='mt-0 w-full ml-26'>
        {errors.password && <p className="text-red-500 text-xs mb-4">{errors.password}</p>}
        </div>
        
        <button type="submit"
         className='bg-gray-300  text-black rounded-md mb-4  p-4 py-2 '>
        Create Account
        </button>
        </div>
        

        </form>


    </div>
  )
}

export default SignUp