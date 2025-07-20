import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className='flex rounded-2xl p-6 ml-2 bg-gray-900 border border-gray-500/50 gap-6 shadow-md'>
     <div className={`flex items-center justify-center w-14 h-14 rounded-full drop-shadow-sm text-[26px] text-white ${color}`}>
            {icon}
        </div>
        <div>
            <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
            <span className='text-[22px]'>${value}</span>
        </div>

    </div>
  )
}

export default InfoCard