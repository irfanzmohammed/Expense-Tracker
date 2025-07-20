import React from 'react'

const Input = ({label,placeholder,type,onChange,value}) => {
  return (
    <div>
        <label className='text-[13px] text-white'>
            {label}
        </label>
        <div className='input-box'>
            <input
            className='w-full bg-transparent outline-none'
            type={type}
            placeholder={placeholder}
            label={label}
            onChange={(e)=>onChange(e)}
            value={value}
            />

        </div>
    </div>
  )
}

export default Input