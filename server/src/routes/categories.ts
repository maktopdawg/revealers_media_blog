import { Router } from "express";
import { body, param } from "express-validator";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import { 
    addNewCategory 
} from "../controllers/categoriesController";

const router = Router();

router.route('/api/categories')
    .post(addNewCategory)

export default router;