import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionCard from '../cards/TransactionCard'
import moment from 'moment';


const RecentTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between '>
            <h5 className='text-lg'>Recent Transactions</h5>
            <button className='card-btn' onClick={onSeeMore}>
               See All <LuArrowRight className='text-base'/>
           </button>
        </div>
        <div className='mt-6'>
            {transactions?.length > 0 ? (
           transactions.slice(0, 5).map((item) => (
           <TransactionCard
      key={item._id}
      // title={item.type == 'expense' ? item.category : item.source}
      title={item.category}
      icon={item.icon}
      amount={item.amount}
      date={moment(item.date).format("DD MMM YYYY")}
      type={item.type}
      hideDeleteBtn
    />
  ))
) : (
  <p className="text-gray-400 text-sm">No transactions found.</p>
)}

        </div>

    </div>
  )
}

export default RecentTransactions