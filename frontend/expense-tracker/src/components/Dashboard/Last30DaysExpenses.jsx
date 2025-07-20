import React, { useEffect, useState } from 'react'
import { ExpenseBarChartData } from '../../utils/ExpenseBarChartData';
import CustomBarChart from '../Charts/CustomBarChart';
const Last30DaysExpenses = ({data}) => {
    const [charData,setChartData]=useState([]);
    useEffect(
        ()=>{
            const result=ExpenseBarChartData(data);
            setChartData(result);
            return()=>{};
        },[data]
    )
  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>
        <CustomBarChart data={charData}/>


    </div>
  )
}

export default Last30DaysExpenses