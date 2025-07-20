// import jwt from 'jsonwebtoken'

// export const createJWT=(data)=>{
//     const token=jwt.sign(data,process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRES_IN
//     });

//     return token;
// }

// export const verifyJWT=(token)=>{
//     const decoded=jwt.verify(token,process.env.JWT_SECRET);
//     return decoded;
// }

import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/customError.js";


export const createJWT=(data)=>{
        const token=jwt.sign(data,process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        });
    
        return token;
    }
    
export const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      throw new UnauthenticatedError("Token expired. Please log in again.");
    }
    throw new UnauthenticatedError("Invalid token.");
  }
};
