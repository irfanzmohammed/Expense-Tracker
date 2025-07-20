
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import React from 'react'
import AppLayout from './layouts/AppLayout.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import Login from './pages/auth/Login.jsx'
import Income from './pages/Dashboard/Income.jsx'
import Home from './components/Home.jsx'
import Expense from './pages/Dashboard/Expense.jsx'
import AuthLayout from  './pages/auth/AuthLayout'
import UserProvider from './context/UserContext'
import DashboardHome from './pages/Dashboard/DashboardHome.jsx'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute.jsx'
const approuter =createBrowserRouter([
  {element: <AppLayout/>,
  children: [
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/auth',
      element:<AuthLayout/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<SignUp/>
    },
    {
      path:'/dashboard',
      element:(
      <ProtectedRoute><DashboardHome/></ProtectedRoute>
      )
    },
    {
      path:'/income',
      element: (
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        )
    },
    {
      path:'/expense',
     element: (
          <ProtectedRoute>
            <Expense />
          </ProtectedRoute>
        )
    },
  ],
},
]);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={approuter}/>
      <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize:'13px'
        }
      }}
      />
    </UserProvider>
  )
}

export default App