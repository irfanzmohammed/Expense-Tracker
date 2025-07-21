import React from 'react'
import useUserAuth from '../Hooks/useUserAuth'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({children}) => {
  const { user} = useUserAuth();
  if (user===null) {
    return <Navigate to="/auth" replace />
  }
  return children
}

export default ProtectedRoute