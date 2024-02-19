import Router from "express";
import signupRouter from './signup';
import usersRouter from './users'
import subscribtionRouter from './subscriptions'
import pollsRouter from './polls'
import reporstRouter from './reporting'

const router = Router();

router.use(signupRouter)
router.use(usersRouter)
router.use(subscribtionRouter)
router.use(pollsRouter)
router.use(reporstRouter);

export default router;