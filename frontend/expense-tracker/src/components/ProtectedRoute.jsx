import React, { useContext } from 'react'

import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({children}) => {
  const { user} = useContext(UserContext)
  if (user===null) {
    return <Navigate to="/auth" replace />
  }
  return children
}

export default ProtectedRoute