import { verifyJWT } from "../utils/jwtUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";

export const authenticateUser=(req,res,next)=>{
    const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if(!token){
        throw new UnauthenticatedError("invalid authentication")
    }

    try{
        const{userId}=verifyJWT(token);
        req.user={userId};
        next();
    }
    catch(error){
        throw new UnauthenticatedError("invalid authentication")
    }

}


// import { verifyJWT } from "../utils/jwtUtils.js";
// import { UnauthenticatedError } from "../errors/customError.js";

// export const authenticateUser = (req, res, next) => {
//     console.log("Cookies Received:", req.cookies); // Check if token is received
//     console.log("Authorization Header:", req.header("Authorization"));
  
//     const token =
//       req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  
//     console.log("Received Token:", token); // See if token is found
  
//     if (!token) {
//       console.error("Token is missing!");
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized. Token is missing.",
//       });
//     }
  
//     try {
//       const { userId } = verifyJWT(token);
//       console.log("Decoded User ID:", userId); // See if token is decoded
//       req.user = { userId };
//       next();
//     } catch (error) {
//       console.error("JWT Verification Error:", error.message);
//       return res.status(401).json({
//         success: false,
//         message: "Invalid or expired token.",
//       });
//     }
//   };
  
// import jwt from 'jsonwebtoken';
// import User from '../models/userSchema.js';

// export const authenticateUser =async(req,res,next)=>{
//  let token = req.headers.authorization?.split(" ")[1];
//    if (!token) return res.status(401).json({message:"Not authorized, no token"});

//    try{
//     const decoded=jwt.verify(token,process.env.JWT_SECRET);
//     req.user=await User.findById(decoded.id).select('-password');
//     next();
//    }
//    catch(err){
//   res.status(401).json({ message: "Not authorized, token failed" });
//    }

// }