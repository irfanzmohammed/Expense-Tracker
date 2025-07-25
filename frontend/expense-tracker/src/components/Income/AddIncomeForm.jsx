import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../../Layouts/EmojiPickerPopup'
const AddIncomeForm = ({onAddIncome}) => {
    const[income,setIncome]=useState({
        category:"",
        amount:"",
        date:"",
        icon:""
    })

    const handleChange=(key,value)=>
        setIncome({...income, [key]:value
        })
  return (
    <div>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
        />
        <Input
        value={income.category}
        onChange={({target})=>handleChange("category",target.value)}
        label="Income Category"
        placeholder="Salary,Freelance,etc"
        type="text"
        />
         <Input
        value={income.amount}
        onChange={({target})=>handleChange("amount",target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        />
         <Input
        value={income.date}
        onChange={({target})=>handleChange("date",target.value)}
        label="Date"
        placeholder=""
        type="date"
        />

        <div className='flex justify-end mt-6 '>
            <button 
              type="button"
              className='add-btn add-btn-fill'
              onClick={()=>onAddIncome(income)}
            >Add Income
            </button>

        </div>

    </div>
  )
}

export default AddIncomeForm