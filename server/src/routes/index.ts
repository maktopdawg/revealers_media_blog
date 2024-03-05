import Router from "express";
import signupRouter from './signup';
import usersRouter from './users';
import subscribtionRouter from './subscriptions';
import pollsRouter from './polls';
import reportsRouter from './reporting';
import postsRouter from './posts';
import commentsRouter from './comments';
import categoriesRouter from './categories'

const router = Router();

router.use(signupRouter);
router.use(usersRouter);
router.use(subscribtionRouter);
router.use(pollsRouter);
router.use(reportsRouter);
router.use(postsRouter);
router.use(commentsRouter);
router.use(categoriesRouter);

export default router;