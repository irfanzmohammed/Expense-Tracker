import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },

    createdBy:{
        type:mongoose.Types.ObjectId
    }
})

export default mongoose.model('User',userSchema);