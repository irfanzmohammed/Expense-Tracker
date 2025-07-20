import React, { useEffect, useState } from 'react'
import { ExpenseLineChartData } from '../../utils/ExpenseLineChartData';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';
const ExpenseOverview = ({transactions,onAddExpense}) => {
  const [chartData,setChartData]=useState([]);
  useEffect(()=>{
   
   const result=ExpenseLineChartData(transactions);
   setChartData(result);

   return ()=>{}
  },[transactions])
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
        <div className=''>
            <div className='text-lg'>Expense Overview</div>
            <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time 
                and gain insights into where your money goes</p>
        </div>
        <button className='card-btn' onClick={onAddExpense}>
            <LuPlus className='text-lg'/> Add Expense
        </button>
        </div>
      <div className='mt-10'>
        <CustomLineChart data={chartData}/>
      </div>
    </div>
  )
}

export default ExpenseOverview