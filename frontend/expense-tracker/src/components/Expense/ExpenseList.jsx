import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionCard from '../cards/TransactionCard'
import moment from 'moment'
const ExpenseList = ({transactions,onDelete,onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5>All Expenses</h5>
        <button className='card-btn'
        onClick={onDownload}>
        <LuDownload />Download
        </button>
      </div>
    <div className='grid grid-cols-1 md:grid-cols-2'>
      {
        Array.isArray(transactions) &&
        transactions?.map((expense)=>(
          <TransactionCard
          key={expense._id}
          title={expense.category}
          amount={expense.amount}
          type="expense"
          icon={expense.icon}
          onDelete={()=>onDelete(expense._id)}
          date={moment(expense.date).format('DD MM YYYY')}
          />
        ))}
    </div>
      
    </div>
  )
}

export default ExpenseList