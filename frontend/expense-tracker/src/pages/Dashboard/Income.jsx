import React, { useEffect, useState } from 'react'
import IncomeOverview from '../../components/Income/IncomeOverview'
import DashboardLayout from '../../Layouts/DashboardLayout'

import Modal from '../../Layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../Layouts/DeleteAlert';
import useUserAuth from '../../Hooks/useUserAuth.jsx'
const Income = () => {
 useUserAuth();
  const [incomeData,setIncomeData]=useState([]);
  const[loading,setLoading]=useState(false);
  const[addIncomeModal,setAddIncomeModal]=useState(false);
  const[deleteAlert,setDeleteAlert]=useState({
    show:false,
    data:null,
  })

  //Get Income
   const fetchIncomeDetails=async()=>{
    if(loading) return
    setLoading(true);
    try{
      const response =await axiosInstance.get(import.meta.env.VITE_APP_GET_INCOME,
        { withCredentials: true }
      )
      if(response.data){
        setIncomeData(response.data)
      }
    }
    catch(error){
      console.log("Error fetching Income Data",error);
    }
    finally{
      setLoading(false);
    }
   }


  //Add Income
  const handleAddIncome=async(income)=>{
    const{category,amount,icon,date}=income;

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
      await axiosInstance.post(import.meta.env.VITE_APP_ADD_INCOME,{
        category,amount,date,icon
      });
      setAddIncomeModal(false);
      toast.success("Income Added Successfully");
      fetchIncomeDetails();
    }
    catch(error){
      console.error("Error adding income",error?.response?.data?.message || error.message)
    }
  }

  //delete Income
   const deleteIncome=async(id)=>{
    try{
      await axiosInstance.delete(`${import.meta.env.VITE_APP_DEL_INCOME}/${id}`)
      setDeleteAlert({show:false, data:null});
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    }
    catch(error){
      console.error("Error deleting income",error.response?.data?.message || error.message)
    }
   }
  
  //download Income
   const downloadIncome=async()=>{
     try{
           const response=await axiosInstance.get(import.meta.env.VITE_APP_DOWNLOAD_INCOME,
           {
            responseType:"blob",
           }
          );
    
          //create url for blob
          const url=window.URL.createObjectURL(new Blob([response.data]))
          const link=document.createElement("a");
          link.href=url
          link.setAttribute("download","Income_details.xlsx")
          document.body.appendChild(link)
          link.click();
          link.parentElement.removeChild(link)
          window.URL.revokeObjectURL(url)
         }
         catch(error){
             console.error("error downloading income details",error);
             toast.error("Failed to download income details.Please try again")
         }
   }

   useEffect( ()=>{
    fetchIncomeDetails();
    return ()=>{}
   },[]);


  return (
    <DashboardLayout activeMenu="Dashboard" className='text-white'>
          <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=>setAddIncomeModal(true)}
              />
            </div>
            <IncomeList
             transactions={incomeData}
             onDelete={(id)=>{
              setDeleteAlert({show:true,data:id});
             }}
             onDownload={downloadIncome}
            />
          </div>

          <Modal
          isOpen={addIncomeModal}
          onClose={()=>setAddIncomeModal(false)}
          title="Add Income">
         <AddIncomeForm onAddIncome={handleAddIncome}/>
          </Modal>

          <Modal
          isOpen={deleteAlert.show}
          onClose={()=>setDeleteAlert({show:false,data:null})}
          title="Delete Income"
          >
          <DeleteAlert
          content="Are you sure want to delete this income details?"
          onDelete={()=>deleteIncome(deleteAlert.data)}
          /> 
          </Modal>

           </div>
    </DashboardLayout>
  )
}

export default Income