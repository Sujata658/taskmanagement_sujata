import { Router } from 'express';
import TasksController from './controller';
import { requireUser } from '../../../middleware/requireUser';
import { logActivity } from '../../../middleware/activityLogs';
import { Activities } from '../../../enums/activities';

 

const TaskRouter = Router();


// Get All the tasks
TaskRouter.route('/').get(requireUser, TasksController.getTasks);

//Get todo tasks
TaskRouter.route('/:status').get(requireUser, TasksController.getToDoTasks);

// Get one task
TaskRouter.route('/one/:id').get(requireUser, TasksController.getTask);

// Create new task
TaskRouter.route('/').post( requireUser,TasksController.createTask, logActivity(Activities.Create, 'Task'));

// Update a task
TaskRouter.route('/:id').patch(requireUser, TasksController.updateTask, logActivity(Activities.Update, 'Task'));

// Delete a task
TaskRouter.route('/:id').delete(requireUser, TasksController.deleteTask, logActivity(Activities.Delete, 'Task'));

//Update task status
TaskRouter.route('/:id/:from/:to').patch(requireUser, TasksController.updateTaskStatus, logActivity(Activities.UpdateTaskStatus, 'Task'));



export default TaskRouter;