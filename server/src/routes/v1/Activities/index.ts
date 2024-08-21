import { Router } from 'express';
import { requireUser } from '../../../middleware/requireUser';
import ActivitiesController from './controller';

 

const ActivityRouter = Router();


// Get All the tasks
ActivityRouter.route('/').get(requireUser, ActivitiesController.getActivities);


export default ActivityRouter;