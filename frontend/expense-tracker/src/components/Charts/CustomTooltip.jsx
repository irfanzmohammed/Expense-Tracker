import React from 'react'

const CustomTooltip = ({active,payload}) => {
  if (active && payload && payload.length) {
    return (
        <div className='bg-gray-900  shadow-none outline-none rounded-lg p-2  border-none'>
            <p className='text-xs  text-white font-semibold mb-1 '>{payload[0].name}</p>
            <p className='text-sm text-gray-300'>
                Amount:<span className='text-sm text-white font-medium'>${payload[0].value}</span>
            </p>
        </div>
      )
}
return null
  
}

export default CustomTooltip