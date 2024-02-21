// Implement routes for reporting inappropriate or abusive content. 
// Allow users to flag posts or comments for review, and create routes for handling these reports.
import { Router } from "express";
import { createReport, getReports, deleteReport } from "../controllers/reportController";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import { query } from "express-validator";

const router = Router();

router.route('/api/reports')
    .get(
        query('filter')
            .isString()
            .notEmpty().withMessage('Must not be empty.')
            .isLength({ min: 3, max: 20 }).withMessage('Must be atleast 3 to 10 characters'),
        getReports
        )
    .post(createReport)
    .delete(deleteReport)

export default router;