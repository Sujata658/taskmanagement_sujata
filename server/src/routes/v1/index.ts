import { Router } from 'express';

import Health from './Health';
import auth from './Auth';
import TaskRouter from './Tasks';
import UserRouter from './Users';
import CommentsRouter from './Comments';
import TagsRouter from './Tags';
import ActivityRouter from './Activities';
import RuleRouter from './Rules';

const router = Router();
router.use('/health', Health);

router.use('/auth', auth)
router.use('/users', UserRouter);
router.use('/tasks/:taskId/comments', CommentsRouter)
router.use('/tasks/:taskId/tags', TagsRouter)
router.use('/tasks', TaskRouter)
router.use('/activities', ActivityRouter)
router.use('/rules', RuleRouter)

export default router;
