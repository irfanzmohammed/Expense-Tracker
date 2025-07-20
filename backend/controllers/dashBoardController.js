import mongoose from "mongoose"
import Expense from "../models/expenseSchema.js";
import Income from '../models/incomeSchema.js'
import { StatusCodes } from "http-status-codes";
export const getDashBoard=async(req,res)=>{
    try{
       const {userId}=req.user
       const userObjectId=new mongoose.Types.ObjectId(String(userId));

       const totalIncome=await Income.aggregate([
        {$match:{userId:userObjectId}},
        {$group:{_id:null,total:{$sum:"$amount"}}},
       ]);

       const totalExpense=await Expense.aggregate([
        {$match:{userId:userObjectId}},
        {$group:{_id:null,total:{$sum:"$amount"}}},
       ]);

       //last 60days income
       const last60daysIncomeTransactions=await Income.find({
         userId,
         date:{$gte:new Date(Date.now()-60*24*60*60*1000)},
       }).sort({date:-1});

       //total income for 60 days
       const incomeLast60Days=last60daysIncomeTransactions.reduce((sum,item)=>
          sum+item.amount,0
       );

      //last 30days expense
       const last30daysExpenseTransactions=await Expense.find({
         userId,
         date:{$gte:new Date(Date.now()-30*24*60*60*1000)},
       }).sort({date:-1});

      //total 30 days expense
      const expenseLast30Days=last30daysExpenseTransactions.reduce((sum, item) => 
      sum + item.amount, 0);

       //last 5 income & expense
       const lastTransactions=[
         ...(await Income.find({userId}).sort({date:-1}).limit(5))
         .map(
            (txn)=>({
               ...txn.toObject(),
               type:"income",
            })
         ),
         ...(await Expense.find({userId}).sort({date:-1}).limit(5))
         .map(
            (txn)=>({
               ...txn.toObject(),
               type:"expense",
            })
         ),
       ].sort((a,b)=>b.date-a.date);

      //final response
       res.status(StatusCodes.OK).json({
       totalBalance:(totalIncome[0]?.total||0)-(totalExpense[0]?.total||0),
       totalIncome:totalIncome[0]?.total||0,
       totalExpense:totalExpense[0]?.total||0,
       
       last30DaysExpenses:{
         total:expenseLast30Days,
         transactions:last30daysExpenseTransactions
       },

      last60DaysIncome:{
        total:incomeLast60Days,
        transactions:last60daysIncomeTransactions
      },

      recentTransactions:lastTransactions,
       });
    }
    catch(error){
      console.error("Dashboard Error:", error);
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Error fetching dashboard data'})
    }

   }
    
//   try {
//     const { userId } = req.user;
//     const userObjectId = new mongoose.Types.ObjectId(String(userId));

//     // TOTAL INCOME & EXPENSE
//     const totalIncomeAgg = await Income.aggregate([
//       { $match: { userId: userObjectId } },
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);
//     const totalExpenseAgg = await Expense.aggregate([
//       { $match: { userId: userObjectId } },
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);

//     const totalIncome = totalIncomeAgg[0]?.total || 0;
//     const totalExpense = totalExpenseAgg[0]?.total || 0;
//     const totalBalance = totalIncome - totalExpense;

//     // UTILITY: helper for date range
//     const getPastDate = (daysAgo) => {
//       const date = new Date();
//       date.setDate(date.getDate() - daysAgo);
//       return date;
//     };

//     // PAST 60 DAYS INCOME & EXPENSE
//     const incomePast60Days = await Income.find({
//       userId: userObjectId,
//       date: { $gte: getPastDate(60) },
//     }).select("amount");

//     const sixtyDaysIncome = incomePast60Days.reduce(
//       (sum, item) => sum + Number(item.amount),
//       0
//     );

//     const expPast60Days = await Expense.find({
//       userId: userObjectId,
//       date: { $gte: getPastDate(60) },
//     }).select("amount");

//     const sixtyDaysExp = expPast60Days.reduce(
//       (sum, item) => sum + Number(item.amount),
//       0
//     );

//     // PAST 30 DAYS INCOME & EXPENSE
//     const incomePast30Days = await Income.find({
//       userId: userObjectId,
//       date: { $gte: getPastDate(30) },
//     }).select("amount");

//     const thirtyDaysIncome = incomePast30Days.reduce(
//       (sum, item) => sum + Number(item.amount),
//       0
//     );

//     const expPast30Days = await Expense.find({
//       userId: userObjectId,
//       date: { $gte: getPastDate(30) },
//     }).select("amount");

//     const thirtyDaysExp = expPast30Days.reduce(
//       (sum, item) => sum + Number(item.amount),
//       0
//     );

//     // LAST 5 INCOME TRANSACTIONS
//     const lastIncomeTransactions = await Income.find({ userId: userObjectId })
//       .sort({ date: -1 })
//       .limit(5)
//       .select("date category amount");

//     // LAST 5 EXPENSE TRANSACTIONS
//     const lastExpTransactions = await Expense.find({ userId: userObjectId })
//       .sort({ date: -1 })
//       .limit(5)
//       .select("date category amount");

//     // FINAL RESPONSE
//     res.status(StatusCodes.OK).json({
//       totalBalance,
//       totalIncome,
//       totalExpense,

//       last60daysIncomeTransactions: {
//         total: incomePast60Days,
//         transactions: sixtyDaysIncome,
//       },

//       last60daysExpenseTransactions: {
//         total: expPast60Days,
//         transactions: sixtyDaysExp,
//       },

//       last30daysIncomeTransactions: {
//         total: incomePast30Days,
//         transactions: thirtyDaysIncome,
//       },

//       last30daysExpenseTransactions: {
//         total: expPast30Days,
//         transactions: thirtyDaysExp,
//       },

//       recentIncome: lastIncomeTransactions,
//       recentExpense: lastExpTransactions,
//     });
//   } catch (error) {
//     console.error("Dashboard Error:", error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "Error fetching dashboard data" });
//   }

