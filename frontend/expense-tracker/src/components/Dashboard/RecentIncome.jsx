import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionCard from '../cards/TransactionCard'
import moment from 'moment'
const RecentIncome = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
    <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income</h5>
        <button className='card-btn' onClick={onSeeMore}>
            See All<LuArrowRight className='text-base'/>
        </button>
    </div>
    <div className='mt-6'>
        {
              transactions.slice(0, 5).map((item) => (
            <TransactionCard
                    key={item._id}
                    title={item.category}
                    icon={item.icon}
                    amount={item.amount}
                    date={moment(item.date).format("DD MMM YYYY")}
                    type="income"
                    hideDeleteBtn
            />
        ))
    }
    </div>
    </div>
  )
}

export default RecentIncome