import React from 'react'
import useUserAuth from '../Hooks/useUserAuth'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({children}) => {
  const { user, loading } = useUserAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  
  if (user===null) {
    return <Navigate to="/auth" replace />
  }
  return children
}

export default ProtectedRoute