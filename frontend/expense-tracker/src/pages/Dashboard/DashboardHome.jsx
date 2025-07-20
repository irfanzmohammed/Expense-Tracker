import React, { useEffect } from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout.jsx'
import useUserAuth from '../../Hooks/useUserAuth.jsx'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance.jsx'
import InfoCard from '../../components/cards/InfoCard.jsx'
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu'
import {IoMdCard} from "react-icons/io"
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx'
import FinancialOverview from '../../components/Dashboard/FinancialOverview.jsx'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions.jsx'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses.jsx'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart.jsx'
import RecentIncome from '../../components/Dashboard/RecentIncome.jsx'
const DashboardHome= () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  const location=useLocation();
  const [loading, setLoading] = useState(false);
  
// Clear any previous route from stack
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard", { replace: true }); // ensures /login or /signup not in stack
    }
  }, [navigate, location.pathname]);

  // Fetch Dashboard Data
  const getDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        import.meta.env.VITE_APP_DASHBOARD
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard" className='text-white'>
          <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 md:grid grid-cols-3 gap-6'>
            <InfoCard
            icon={<IoMdCard/>}
            label='Total Balance'
            value={dashboardData?.totalBalance||0}
            color='bg-gray-700'
            />
            <InfoCard
           icon={<LuWalletMinimal/>}
            label='Total Income'
            value={dashboardData?.totalIncome||0}
            color='bg-gray-700'
            />
            <InfoCard
            icon={<LuHandCoins/>}
            label='Total Expense'
            value={dashboardData?.totalExpense||0}
            color='bg-gray-700'
            />
          </div>
          <div className='grid grid-cols-1 md:grid grid-cols-2 gap-6 mt-6'>
            
            <RecentTransactions
            transactions={dashboardData?.recentTransactions ||[]
           }  
          onSeeMore={() => navigate("/expense")}
          />
            <FinancialOverview
            totalBalance={dashboardData?.totalBalance||0}
            totalIncome={dashboardData?.totalIncome||0}
            totalExpense={dashboardData?.totalExpense||0}
            />
            <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions}
             onSeeMore={()=>navigate("/expense")}
             />
             <Last30DaysExpenses
             data={dashboardData?.last30DaysExpenses?.transactions}
              />
            <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) ||[]}
            totalIncome={dashboardData?.totalIncome ||0}
            />
            <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions||[]}
            onSeeMore={()=>navigate("/income")}
            />
           
          </div>
          </div>
    </DashboardLayout>
  
  )
}

export default DashboardHome