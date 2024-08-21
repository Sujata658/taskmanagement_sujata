import { Router } from 'express';
import { requireUser } from '../../../middleware/requireUser';
import CommentsController from './controller';
import { logActivity } from '../../../middleware/activityLogs';
import { Activities } from '../../../enums/activities';

const CommentsRouter = Router({mergeParams: true});


// Create a Comment
CommentsRouter.route('/').post(requireUser, CommentsController.createComment, logActivity(Activities.Create, 'comment'));

// Edit a Comment
CommentsRouter.route('/:id').patch(requireUser,CommentsController.updateComment, logActivity(Activities.Update, 'comment'));

// Delete a Comment
CommentsRouter.route('/:id').delete(requireUser, CommentsController.deleteComment, logActivity(Activities.Delete, 'comment'));


export default CommentsRouter;