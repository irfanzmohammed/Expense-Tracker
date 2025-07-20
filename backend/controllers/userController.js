import { StatusCodes } from "http-status-codes";
import User from "../models/userSchema.js";
import {hashPassword,comparePassword}from '../utils/passwordUtils.js'
import { NotFoundError, UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/jwtUtils.js";

export const register=async(req,res)=>{
  try{  

   const hashedPassword=await hashPassword(req.body.password);
   req.body.password=hashedPassword;

   const user=await User.create(req.body);
   res.status(StatusCodes.CREATED).json({msg:'User Registered Successfully'});
  }
  catch (error) {
    console.error("Error in register:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Something went wrong" });
  }
}

export const login=async(req,res)=>{
    try{
    const user =await User.findOne({email:req.body.email});
    if (!user) {
      throw new UnauthenticatedError('Invalid credentials');
    }
    const isValidUser=user&& await(comparePassword(req.body.password,user.password));
    if(!isValidUser) throw new UnauthenticatedError('invalid credentials');

    const token=createJWT({userId:user._id});
    const oneDay=1000*60*60*24;
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:  "none",
        secure: true, 
        expires:new Date(Date.now()+oneDay),
      
    })
    

    res.status(StatusCodes.OK).json({msg:' user loggedIn successfully'})
    }
    catch(err){
        console.error('Login error:', err); 
    }
    
}


export const getUser=async(req,res)=>{
    const {userId}=req.user
    const user =await User.findById(userId).select("-password");
    if(!user){
       throw new NotFoundError("user not found")
    }

    res.status(StatusCodes.OK).json({user});
}


export const logout=async(req,res)=>{
    res.cookie('token',"",{
        httpOnly:true,
        expires:new Date(Date.now()),
    })

    res.status(StatusCodes.OK).json({msg:' user loggedOut successfully'})
}


