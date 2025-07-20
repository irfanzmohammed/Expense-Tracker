import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionCard from '../cards/TransactionCard'
import moment from 'moment'
const IncomeList = ({transactions,onDownload,onDelete}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Categories</h5>
            <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base'/>Download
            </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((income)=>(
                <TransactionCard
                key={income._id}
                title={income.category}
                icon={income.icon}
                date={moment(income.date).format('DD MMM YYYY')}
                amount={income.amount}
                type="income"
                onDelete={()=>onDelete(income._id)}
                />
            )
        )}
        </div>

    </div>
  )
}

export default IncomeList