import { StatusCodes } from "http-status-codes";
import Expense from "../models/expenseSchema.js";
import ExcelJS from 'exceljs';

export const addExpense=async(req,res)=>{
   const{icon,category,amount,date}=req.body
  if(!amount || !category ||!date) throw new BadRequestError('please provide all fields');
   try{
    const {userId}=req.user
    const expense=await Expense.create({
        userId,
        icon,
        category,
        amount,
        date
    });

   res.status(StatusCodes.CREATED).json({msg:"Expense created",expense});
   }
   catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Error adding expense"});
   }
}

export const getAllExpense=async(req,res)=>{
    try{
    const {userId}=req.user
    const expenses=await Expense.find({userId}).sort({date:-1});
    res.status(StatusCodes.OK).json({msg:"Expenses found",expenses});
    }

    catch(error){
        res.status(StatusCodes.NOT_FOUND).json({msg:"Expenses not found"});
    }

}

export const deleteExpense=async(req,res)=>{
    
    try{
        const deleteExpense=await Expense.findByIdAndDelete(req.params.id);
         if(!deleteExpense) throw new BadRequestError("expense not found")
        res.status(StatusCodes.OK).json({msg:"Expenses Deleted"});
    }
    catch(error){
        res.status(StatusCodes.NOT_FOUND).json({msg:"Error deleting expenses"});
    }

}

export const downloadExpense=async(req,res)=>{
    const {userId}=req.user;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        const workbook=new ExcelJS.Workbook();
        const worksheet=workbook.addWorksheet('Expense data');
        worksheet.addRow(['Category','Amount','Date']);

        expense.forEach((item)=>{
           worksheet.addRow([
           item.category,
           item.amount,
           new Date(item.date).toLocaleDateString()
           ])
        });
       
        res.attachment('expense.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    }
    catch(error){
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'error downloading expense'});
    }
    
}