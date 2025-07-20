import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app=express();
import cors from 'cors'
import cookieParser from 'cookie-parser';

app.use(cors(
    {
        origin: process.env.CLIENT_URL,     
        credentials: true,   
    }
))
app.use(express.json());
app.use(cookieParser());

import connectDB from "./dbConnection.js"
import userRouter from './routes/userRouter.js'
import incomeRouter from './routes/incomeRouter.js'
import expenseRouter from './routes/expenseRouter.js'
import dashBoardRouter from './routes/dashBoardRouter.js'
import { authenticateUser } from './middlewares/authMiddleware.js';

app.use('/api/v1/user',userRouter);
app.use('/api/v1/income',authenticateUser,incomeRouter);
app.use('/api/v1/expense',authenticateUser,expenseRouter);
app.use('/api/v1/dashboard',authenticateUser,dashBoardRouter);


//dbconnection//
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server listening to ${PORT}`);
})