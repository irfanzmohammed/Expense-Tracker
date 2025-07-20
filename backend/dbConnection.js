import mongoose from "mongoose";
const connectDB=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db connection established')
   }
   catch(error){
    console.log('error connecting db',error);
    process.exit(1);
   }
}

export default connectDB;