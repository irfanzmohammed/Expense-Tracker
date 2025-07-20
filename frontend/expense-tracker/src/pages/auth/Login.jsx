import React from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useState,useEffect} from 'react';
import { validateLoginForm } from '../../utils/validateLogin';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate=useNavigate();
    const[showPassword,setShowPassword]=useState(false);
    const[errors,setErrors]=useState({});
    const {user,updateUser}=useContext(UserContext)
    //form validation
     const[formData,setFormData]=useState({
            email:"",
            password:"",
          }
          );
           const handleInputChange=(e)=>{
            const {name,value}= e.target;
            setFormData((prevState)=>({
              ...prevState,
              [name]:value,
            }));
           }

           useEffect(() => {
         if (user) {
         navigate('/dashboard', { replace: true });
         }
        }, [user, navigate]);



    const handleLogin=async()=>{
      const { email, password } = formData; 
      try{
        const response=await axios.post(import.meta.env.VITE_REACT_APP_LOGIN,
          
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data) {
          updateUser(response.data.user);
          navigate("/dashboard")
        }
      }  
      

      catch(error){
        console.error("error logging in",error)
      }
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const validateErrors=validateLoginForm(formData);
      setErrors(validateErrors);
      if(Object.keys(validateErrors).length === 0){
          console.log("form submitted",formData);
      }
      await handleLogin();
     }
           
  return (
    <div className='flex items-center '>
    <form className='border border-gray-500 rounded-md  w-96' onSubmit={handleSubmit}>
    
    <h3 className='text-xl px-12 mt-4'>Login</h3>
    <p className='px-12 mb-2 text-sm text-gray-400'>to your account if you already have one</p>

   
    <div className='flex flex-col items-center'>
    <input 
    type="email"
    name="email"
    value={formData.email}
    placeholder="Enter Email"
    className='w-3/4 rounded-md p-2 mb-4 m border border-gray-500 '
    onChange={handleInputChange}
    />
    <div className='mt-0 w-full ml-26'>
      {errors.email && <p className="text-red-500 text-xs mb-4">{errors.email}</p>}
      </div>
  
    <div className='w-3/4 relative'>
    <input 
    type={showPassword?"text":"password"}
    name="password"
    placeholder="Enter Password"
    value={formData.password}
    className='w-full  rounded-md mb-4 p-2 border border-gray-500'
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

    <button className='bg-gray-300  text-black rounded-md mb-4  p-4 py-2' type="submit">
    Login
    </button>
    </div>
    

    </form>

   


</div>
  )
}

export default Login