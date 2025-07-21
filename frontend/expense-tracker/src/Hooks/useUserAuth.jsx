import React, { useContext, useEffect,useState } from 'react'

import { UserContext } from '../context/UserContext';
import axiosInstance from '../utils/axiosInstance';
const useUserAuth = () => {
     const { user, clearUser, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
      try {
        const response = await axiosInstance.get(
          import.meta.env.VITE_REACT_APP_GET_USER
        );

        if (isMounted && response.data?.user) {
          updateUser(response.data.user);
        }
      } catch (error) {
        if (isMounted) {
          clearUser();
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getUser();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser]);

  return { user, loading };
};


export default useUserAuth