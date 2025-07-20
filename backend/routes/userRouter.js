import { Router } from "express";
const router=Router();
import { validateLoginInput,validateRegisterInput } from "../middlewares/validationMiddleware.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

import{login,
    logout,
    register,getUser
} from '../controllers/userController.js'

router.route('/login').post(validateLoginInput,login);
router.route('/register').post(validateRegisterInput,register);
router.route('/getuser').get( authenticateUser,getUser);
router.route('/logout').get(logout);


export default router