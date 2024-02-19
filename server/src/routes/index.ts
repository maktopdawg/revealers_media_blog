import Router from "express";
import signupRouter from './signup';
import usersRouter from './users'
import subscribtionRouter from './subscriptions'
import pollsRouter from './polls'

const router = Router();

router.use(signupRouter)
router.use(usersRouter)
router.use(subscribtionRouter)
router.use(pollsRouter)

export default router;