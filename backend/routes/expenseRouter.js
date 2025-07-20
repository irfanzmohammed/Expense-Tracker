import {Router} from 'express'
const router=Router();

import {
    addExpense,
    deleteExpense,
    getAllExpense,
    downloadExpense
} from '../controllers/expenseController.js'

router.route('/add').post(addExpense);
router.route('/:id').delete(deleteExpense);
router.route('/get').get(getAllExpense);
router.route('/download').get(downloadExpense);

export default router