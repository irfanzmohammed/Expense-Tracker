import { Router } from "express";
const router=Router();

import{
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncome,
}from '../controllers/incomeController.js'
import { authenticateUser } from "../middlewares/authMiddleware.js";

router.route('/add').post(authenticateUser,addIncome);
router.route('/get').get ( authenticateUser,getAllIncome);
router.route('/:id').delete(authenticateUser,deleteIncome);
router.route('/download').get(authenticateUser,downloadIncome);


export default router;