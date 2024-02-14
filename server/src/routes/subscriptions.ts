// Allow users to subscribe to email notifications or RSS feeds for new blog posts. 
// Implement routes for managing subscriptions, such as subscribing, unsubscribing, and fetching subscribed users.
import { Router } from "express";
import { getNewsletterSubscribedUsers } from "../controllers/usersController";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import { query } from "express-validator";

const router = Router();

router.route('/api/newsletter')
    .get(
        query('filter')
        .isString()
        .notEmpty().withMessage('Must not be empty!')
        .isLength({ min: 3, max: 10 }).withMessage('Must be atleast 3 to 10 characters!'),
        getNewsletterSubscribedUsers
    )

export default router;