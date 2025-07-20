import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/customError.js';
import Income from '../models/incomeSchema.js'
import ExcelJS from 'exceljs';

export const addIncome=async(req,res)=>{
     const {icon,amount,category,date}=req.body;
     if(!amount || !category ||!date) throw new BadRequestError('please provide all fields');
     try{
        const {userId}=req.user
        const income=await Income.create({
            userId,
            icon,
            amount,
            category,
            date
        });
        res.status(StatusCodes.CREATED).json({msg:"Income added Successfully" ,income});
     }
     catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Error adding income"})
     }
}


export const getAllIncome=async(req,res)=>{
     const {userId}=req.user
     try{
        const income=await Income.find({userId}).sort({date:-1});
       res.status(StatusCodes.OK).json(income);
     }
     catch(error){
        res.status(StatusCodes.NOT_FOUND).json({msg:"income not found"});
     }
     
}

export const deleteIncome=async(req,res)=>{
    try{
        const deleteIncome=await Income.findByIdAndDelete(req.params.id);
        if(!deleteIncome) throw new BadRequestError("income not found")
        res.status(StatusCodes.OK).json({ msg: "Income deleted successfully" });

    }
    catch(error){
        res.status(StatusCodes.NOT_FOUND).json({msg:"Error deleting Record"});
     }
}
  
export const downloadIncome=async(req,res)=>{
    const {userId}=req.user
     try{
        const income=await Income.find({userId}).sort({date:-1});
        const workbook = new ExcelJS.Workbook();
        const worksheet=workbook.addWorksheet('Income Data');

        worksheet.addRow(['Category','Amount','Date']);
        income.forEach((item)=>{
         worksheet.addRow([
            item.category,
            item.amount,
            item.date.toLocaleDateString()
         ]);
        });

        res.attachment('income.xlsx')
        await workbook.xlsx.write(res);
        res.end();
       
     }
     catch(error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Error downloading income data"})
     }

}

