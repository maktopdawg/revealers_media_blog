import { Router } from "express";
import { body, param } from "express-validator";
import ROLES from "../config/roles";
import { AddNewComment } from "../controllers/commentsController";

const router = Router();

router.route('/api/news/:slug/comments')
    .post(AddNewComment)


export default router;