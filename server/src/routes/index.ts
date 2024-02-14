import Router from "express";
import signupRouter from './signup';
import usersRouter from './users'
import subscribtionRouter from './subscriptions'

const router = Router();

router.use(signupRouter)
router.use(usersRouter)
router.use(subscribtionRouter)

export default router;