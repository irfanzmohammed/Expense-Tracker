import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
// const colors=["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"]
//  const getRandomColor=()=>{
//     return colors[Math.floor(Math.random()*colors.length)];
//  }
const ProfileIcon = () => {
const {user}=useContext(UserContext);
console.log("User in ProfileIcon:", user);
if(!user || !user.name){
  return(
    <div className='flex justify-center w-20 h-20 items-center rounded-full bg-gray-700 text-white font-bold'>
    
    </div>
  )
}

const username=user.name

const firstLetter=username.charAt(0).toUpperCase();
  return (
    <div className='flex flex-col items-center gap-3'>
      <div  className='flex justify-center w-20 h-20 items-center rounded-full bg-gray-700 text-white text-2xl'>
        {firstLetter}
      </div>
      <p className='font-medium text-white '>{username}</p>
      
    </div>
  )
}

export default ProfileIcon