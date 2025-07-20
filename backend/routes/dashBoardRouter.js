import { Router } from "express";

const router=Router();

import { getDashBoard } from "../controllers/dashBoardController.js";

router.route('/').get(getDashBoard);

export default router