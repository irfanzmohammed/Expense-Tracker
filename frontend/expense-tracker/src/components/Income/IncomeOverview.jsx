import React, { useState,useEffect } from 'react'
import { IncomeBarchartData } from '../../utils/IncomeBarChartData';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart'
const IncomeOverview = ({transactions,onAddIncome}) => {
  const [chartData,setChartData]=useState([]);

  useEffect(()=>{
    const result=IncomeBarchartData(transactions);
    setChartData(result);
    return ()=>{}
  },[transactions]);

  return(<div className='card'>
    <div className='flex items-center justify-between'>
      <div className=''>
         <div className='text-lg'>Income Overview</div>
      <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time and analyze your income trends</p>
      </div>
      <button className='add-btn' onClick={onAddIncome}>
       <LuPlus className='text-lg'/> Add Income 
      </button>
    </div>
    <div className='mt-10'>
      <CustomBarChart data={chartData}/>
    </div>
  </div>

  ) 
}

export default IncomeOverview