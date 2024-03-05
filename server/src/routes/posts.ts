import Router from "express";
import { body, param } from "express-validator";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import { 
    createNewPost,
    getAllPosts
} from "../controllers/postController";

const router = Router();

router.route('/api/news/create-new')
    .post(
        body('title').notEmpty().withMessage('Title is required.'),
        body('author').notEmpty().withMessage('Author is required.'),
        body('coverImage').notEmpty().withMessage('Cover Image is required.'),
        body('description').notEmpty().withMessage('Description is required.'),
        body('content').notEmpty().withMessage('Content is required.'),
        createNewPost
    )

router.route('/api/news')
    .get(getAllPosts)

export default router;