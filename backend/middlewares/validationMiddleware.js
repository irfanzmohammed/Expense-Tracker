import {body,validationResult} from 'express-validator'
import { BadRequestError,NotFoundError,UnauthenticatedError } from '../errors/customError.js'
import User from '../models/userSchema.js';
const validateErrors=(validateValues)=>{
    return[
        ...validateValues,
        (req,res,next)=>{
           const errors=validationResult(req);
           if(!errors.isEmpty()){
            const errorMessages=errors.array().map((error)=>error.msg);
            throw new BadRequestError(errorMessages);
           }

           next();
        }

    ]
}

export const validateRegisterInput=validateErrors([
   body('name').notEmpty().withMessage('name required'),
   body('email').notEmpty().withMessage('email required').
   isEmail().withMessage('invalid Email format').custom(
    async(value)=>{
        const existinguser=await User.findOne({email:value});
        if(existinguser) throw new BadRequestError('email exists already');
    }),
    body('password').notEmpty().withMessage('password required').
    isLength({min:8}).withMessage('password has to be minimum 8 characters')
]);


export const validateLoginInput = validateErrors([
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
      
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ]);