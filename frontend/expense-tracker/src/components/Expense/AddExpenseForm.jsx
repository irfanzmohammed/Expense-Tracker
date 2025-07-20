import React from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../../Layouts/EmojiPickerPopup'
import { useState } from 'react'
const AddExpenseForm = ({onAddExpense}) => {
  const[expense,setExpense]=useState({
    category:"",
    amount:"",
    icon:"",
    date:""
  })

  const handleChange=(key,value)=>{
    setExpense({...expense,[key]:value})
  }
  return (
    <div>
      <EmojiPickerPopup
      icon={expense.icon}
      onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
      />
      <Input
      value={expense.category}
      label="Category"
      onChange={({target})=>handleChange("category",target.value)}
      placeholder="Salary,Freelance,etc"
      type="text"
      />
      <Input
      value={expense.amount}
      type="number"
      label="Amount"
      onChange={({target})=>handleChange("amount",target.value)}
      />
      <Input
      value={expense.date}
      type="date"
      label="Date"
      onChange={({target})=>handleChange("date",target.value)}
      placeholder=""
      />
      <div className='flex justify-end mt-6 '>
        <button 
        type="button"
        className='add-btn add-btn-fill' 
        onClick={()=>onAddExpense(expense)}> Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm