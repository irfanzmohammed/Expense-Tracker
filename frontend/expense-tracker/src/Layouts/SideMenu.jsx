import React from 'react'
import { SIDE_MENU_DATA } from '../utils/data'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import ProfileIcon from '../utils/ProfileIcon'

const SideMenu = () => {
  const {clearUser}=useContext(UserContext);
  const navigate=useNavigate();
   const location = useLocation();
  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };
  
  const handleLogout = async () => {
    try {
       await axios.get(import.meta.env.VITE_APP_LOGOUT, {
        withCredentials: true,
      });
     
      clearUser();
      navigate("/auth",{ replace: true });
    } catch (error) {
      console.error("Unable to logout", error);
    }
  };
  
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-gray-950 border-r border-gray-800/50 p-5 sticky top-[61px] z-20">
      {/* Profile Icon Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        <ProfileIcon />
      </div>
  
      {/* Side Menu Buttons */}
      {SIDE_MENU_DATA.map((item,index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
           location.pathname ===  item.path  ? "text-white bg-gray-700" :""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
  
}

export default SideMenu