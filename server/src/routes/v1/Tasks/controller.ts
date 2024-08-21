import { NextFunction, Request, Response } from "express";
import { Task } from "./model";
import { errorHandler } from "../../../utils/Error";
import InputValidation from "../../../utils/InputValidation";
import TaskService from "./service";
import { successResponse } from "../../../utils/HttpResponse";
import { messages } from "../../../utils/Messages";

const TasksController = {
    async createTask(req: Request<unknown, unknown, any>, res: Response, next: NextFunction) {
        try {
            const { tags, ...taskFields } = req.body;
            
            const task: Task = {
                title: taskFields.title,
                description: taskFields.description,
                dueDate: taskFields.dueDate,
                priority: taskFields.priority,
                assignees: taskFields.assignees,
                status: taskFields.status,
            };
            
            const author = res.locals.user as { _id: string };
    
            InputValidation.validateid(author._id);
            InputValidation.validateTask(task);

            const actask = await TaskService.createTask(task, author._id, tags);

            res.locals.actionOn = actask;
            next(successResponse({
                response: res,
                message: messages.task.creation_success,
                status: 200
            }))
        } catch (error) {
            next(errorHandler(res, error));
        }
    },
    
    async getTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const authorId = res.locals.user as { _id: string }
            InputValidation.validateid(id)
            InputValidation.validateid(authorId._id)


            const result = await TaskService.getTask(id, authorId._id)

            return successResponse({
                response: res,
                message: messages.task.one_get_success,
                status: 200,
                data: result
            })
        } catch (error) {
            next(errorHandler(res, error))
        }
    },
    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = res.locals.user as { _id: string }
            const result = await TaskService.getTasks(authorId._id)
            return successResponse({
                response: res,
                message: messages.task.all_get_success,
                data: result
            })
        } catch (error) {
            next(errorHandler(res, error))
        }

    },
    async updateTask(req: Request<{ id: string }, unknown, Partial<Task>>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const author = res.locals.user as { _id: string }

            const {tags, ...data} = req.body
            InputValidation.validateid(id)

            const result = await TaskService.updateTask(id, author._id, data, tags)

            res.locals.actionOn = result;

            next(successResponse({
                response: res,
                message: messages.task.edit_success,
                data: result,
                status: 200,
            }))

        } catch (error) {
            next(errorHandler(res, error))
        }
    },
    async deleteTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            InputValidation.validateid(id);

            const author = res.locals.user as { _id: string }

            const {task} = await TaskService.deleteTask(id, author._id)

            res.locals.actionOn = task;

            next(successResponse({
                response: res,
                message: messages.task.delete_success,
                status: 200,
            }))
        } catch (error) {
            next(errorHandler(res, error))
        }




    },


    async getToDoTasks(req: Request<{status: string}>, res: Response, next: NextFunction) {
        try {
            const authorId = res.locals.user as { _id: string }
            const {status} = req.params
            const result = await TaskService.getToDoTasks(authorId._id, status)
            return successResponse({
                response: res,
                message: messages.task.all_get_success,
                data: result
            })
        } catch (error) {
            next(errorHandler(res, error))
        }

    },

    async updateTaskStatus(req: Request<{ id: string, from: string, to: string }, unknown, unknown>, res: Response, next: NextFunction) {
        try {
            const { id, from, to } = req.params
            const author = res.locals.user as { _id: string }

            InputValidation.validateid(id)

            if(await TaskService.checkRule(from, to, author._id) === false) throw new Error(messages.task.edit_forbidden)

            const result = await TaskService.updateTaskStatus(id, author._id, to)

            res.locals.actionOn = result;

            next(successResponse({
                response: res,
                message: messages.task.edit_success,
                data: result,
                status: 200,
            }));

        } catch (error) {
            next(errorHandler(res, error))
        }
    },
    
}
export default TasksController;