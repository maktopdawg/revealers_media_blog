import { Router } from "express";
import { getAllUsers, deleteUser, getUserByUsername } from "../controllers/usersController";
import { query } from "express-validator";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";

const router = Router();

router.route('/api/users')
    .get(
        query('filter')
            .isString()
            .notEmpty().withMessage('Must not be empty!')
            .isLength({ min: 3, max: 10 }).withMessage('Must be atleast 3 to 10 characters!'),
        getAllUsers
        )
    .delete(deleteUser);

router.route('/api/users/:username')
    .get(getUserByUsername);

export default router;