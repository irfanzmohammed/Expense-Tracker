import React from 'react'
import { LuUtensils,LuTrendingUp,LuTrendingDown,LuTrash2 } from 'react-icons/lu'
const TransactionCard = ({icon,title,date,amount,type,hideDeleteBtn,onDelete}) => {
  const getAmountStyles=()=>
     type==="income"? "bg-gray-800 text-green-500":"bg-gray-800 text-red-500";
  
  return (
    <div className='group relative flex items-center gap-4  mt-3 pt-2 rounded-lg p-1 '>
  <div className='w-12 h-12 flex items-center justify-center text-xl text-white bg-gray-800 rounded-full'>
    {icon?(  <img src={icon} alt={title} className='w-6 h-6'/>)
   :
    (<LuUtensils/>)
    }
  </div>
  <div className='flex-1 flex  justify-between items-center'>
  <div>
    <p className='text-white font-medium'>{title}</p>
    <p className='text-sm text-gray-400 mt-1'>{date}</p>
  </div>
<div className='flex items-center gap-2'>
    {
        !hideDeleteBtn&&(
            <button className='text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
            onClick={onDelete}
            >
                <LuTrash2 size={18}/>
            </button>
        )
    }
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
        <h6 className='text-xs font-medium'>
            {type==='income'?"+":"-"} ${amount}
        </h6>
        {type ==="income"?<LuTrendingUp/>:<LuTrendingDown/>}
    </div>
</div>
  </div>
    </div>
  )
}

export default TransactionCard