import Router from "express";
import signupRouter from './signup';

const router = Router();

export default router.use(signupRouter)