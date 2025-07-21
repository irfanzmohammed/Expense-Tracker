import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axiosInstance from '../utils/axiosInstance';
const useUserAuth = () => {
    const {user,clearUser,updateUser}=useContext(UserContext)
    const navigate=useNavigate();

    useEffect(() => {
        if (user) return;
    
        let isMounted = true;
    
        const getUser = async () => {
          try {
            const response = await axiosInstance.get(
              import.meta.env.VITE_REACT_APP_GET_USER
            );
    
            if (isMounted && response.data) {
              updateUser(response.data.user); 

            }
          } catch (error) {
            console.error('Error fetching user data', error);
            if (isMounted) {
              clearUser();
              navigate('/auth');
            }
          }
        };
    
        getUser();
    
        return () => {
          isMounted = false;
        };
      }, [user,updateUser, clearUser, navigate]);
      return user;
    };



export default useUserAuth