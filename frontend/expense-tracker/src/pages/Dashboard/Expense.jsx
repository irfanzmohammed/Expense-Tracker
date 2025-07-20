import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'
import useUserAuth from '../../Hooks/useUserAuth';
import { useState,useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../Layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../Layouts/DeleteAlert';
const Expense = () => {
   useUserAuth();
   const [expenseData,setExpenseData]=useState([]);
     const[loading,setLoading]=useState(false);
     const[openAddExpenseModal,setOpenAddExpenseModal]=useState(false);
     const[deleteAlert,setDeleteAlert]=useState({
       show:false,
       data:null,
     })

     
  //Get Income
   const fetchExpenseDetails=async()=>{
    if(loading) return
    setLoading(true);
    try{
      const response =await axiosInstance.get(import.meta.env.VITE_APP_GET_EXPENSE
        ,{ withCredentials: true }
      )
     
      if(response.data?.expenses?.length > 0){
       setExpenseData(response.data.expenses)
      }
    }
    catch(error){
      console.log("Error fetching Expense Data",error);
    }
    finally{
      setLoading(false);
    }
   }


  //Add Income
  const handleAddExpense=async(expense)=>{
    const{category,amount,icon,date}=expense;

    //Validation
    if(!category.trim()){
      toast.error("Category is required");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount)<0){
      toast.error("Amount should be a valid number and greater than zero")
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try{
      await axiosInstance.post(import.meta.env.VITE_APP_ADD_EXPENSE,{
        category,amount,date,icon
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense Added Successfully");
      fetchExpenseDetails();
    }
    catch(error){
      console.error("Error adding expense",error?.response?.data?.message || error.message)
    }
  }

  //delete Income
   const deleteExpense=async(id)=>{
    try{
      await axiosInstance.delete(`${import.meta.env.VITE_APP_DEL_EXPENSE}/${id}`)
      setDeleteAlert({show:false, data:null});
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    }
    catch(error){
      console.error("Error deleting income",error.response?.data?.message || error.message)
    }
   }
  
  //Download Expense
   const downloadExpense=async()=>{
     try{
       const response=await axiosInstance.get(import.meta.env.VITE_APP_DOWNLOAD_EXPENSE,
       {
        responseType:"blob",
       }
      );

      //create url for blob
      const url=window.URL.createObjectURL(new Blob([response.data]))
      const link=document.createElement("a");
      link.href=url
      link.setAttribute("download","Expense_details.xlsx")
      document.body.appendChild(link)
      link.click();
      link.parentElement.removeChild(link)
      window.URL.revokeObjectURL(url)
     }
     catch(error){
         console.error("error downloading expense details",error);
         toast.error("Failed to download expense details.Please try again")
     }
   }

   useEffect( ()=>{
    fetchExpenseDetails();
    return ()=>{}
   },[]);

   
  return (
   <DashboardLayout activeMenu="Dashboard" className='text-white'>
          <div className='my-5 mx-auto'>
            <div className='grid grid-cols-1 gap-6'>
              <div>
                <ExpenseOverview
                transactions={expenseData}
                onAddExpense={()=>setOpenAddExpenseModal(true)}
                />
              </div>
              <ExpenseList
              transactions={expenseData}
              onDelete={(id)=>{
                setDeleteAlert({show:true, data:id})
              }}
              onDownload={downloadExpense}
              />
            </div>
            <Modal
             isOpen={openAddExpenseModal}
             onClose={()=>setOpenAddExpenseModal(false)}
             title="Add Expense"
            >
             <AddExpenseForm onAddExpense={handleAddExpense}/>
            </Modal>
            
          <Modal
          isOpen={deleteAlert.show}
          onClose={()=>setDeleteAlert({show:false,data:null})}
          title="Delete Expense"
          >
          <DeleteAlert
          content="Are you sure want to delete this expense details?"
          onDelete={()=>deleteExpense(deleteAlert.data)}
          /> 
          </Modal>
          </div>
    </DashboardLayout>
  )
}

export default Expense