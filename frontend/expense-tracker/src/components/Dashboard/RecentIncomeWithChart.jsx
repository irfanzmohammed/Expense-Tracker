import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#60A5FA', '#EF4444', '#10B981','#8B5CF6' ];
const RecentIncomeWithChart = ({data,totalIncome}) => {
    const[chartData,setChartData]=useState([]);

    const showChartData=()=>{
        const groupedData = data?.reduce((acc, item) => {
        const existing = acc.find(entry => entry.name === item.category);
       if (existing) {
        existing.amount += item.amount;
      } else {
       acc.push({ name: item.category, amount: item.amount });
     }
     return acc;
     }, []);
    setChartData(groupedData);
    };

    useEffect(()=>{
        showChartData();
        return()=>{};
    },[data]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
         <h5 className='text-base'>Last 60 Days Income</h5>
        </div>
        <CustomPieChart
        data={chartData}
        label="Total Income"
        showTextAnchor
        totalAmount={`$${totalIncome}`}
        color={COLORS}
        />
    </div>
  )
}

export default RecentIncomeWithChart