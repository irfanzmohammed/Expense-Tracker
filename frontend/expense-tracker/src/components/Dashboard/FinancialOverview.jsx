import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#60A5FA', '#EF4444', '#10B981'];
const FinancialOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData=[
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpense},
    ]
    
  return (
    <div className='card' >
        <div className='flex items-center justify-between '> 
             <h5 className='text-lg'> Financial Overview</h5>
        </div>
        
        <CustomPieChart 
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        color={COLORS}
        showTextAnchor
        />
    </div>
    
  )
}

export default FinancialOverview