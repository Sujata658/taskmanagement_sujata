import CustomError from "../../../utils/Error";
import { Task } from "./model";
import { createTask, getTask, getTasks, updateTask, deleteTask, getTaskById, getToDoTasks, updateTaskStatus } from "./repository";
import { messages } from "../../../utils/Messages";
import { getRules } from "../Rules/repository";

const TaskService = {
    createTask(task: Task, authorId: string, tags: string[]) {
        return createTask(task, authorId, tags)
    },
    async getTask(id: string, authorId: string) {
        const checkifTaskExists = await getTaskById(id)
        if (!checkifTaskExists) throw new CustomError(messages.task.not_found, 404)

        const task = await getTask(id, authorId)
        if (!task) throw new CustomError(messages.auth.not_authorized, 404)
        return task
    },
    async getTasks(authorId: string) {
        const tasks = await getTasks(authorId)
        if (!tasks) throw new CustomError(messages.task.not_found, 404)
        return tasks
    },
    async updateTask(id: string, userId: string, data: Partial<Task>, tags: string[] | undefined) {
        const task = await getTaskById(id)
        if (!task) throw new CustomError(messages.task.not_found, 404)

        const res = await updateTask(id, userId, data, tags);
        if (!res) throw new CustomError(messages.task.edit_forbidden, 403);

        return res

    },
    async deleteTask(id: string, userId: string) {
        const task = await getTaskById(id);
        console.log(!task)
        if (!task) throw new CustomError(messages.task.not_found, 404);

        const result = await deleteTask(id, userId);

        if (result.deletedCount === 0) {
            throw new CustomError(messages.task.delete_forbidden, 403);
        }


        return {result,task};
    },

    async getToDoTasks(authorId: string, status: string) {
        const tasks = await getToDoTasks(authorId, status)
        if (!tasks) throw new CustomError(messages.task.not_found, 404)
        return tasks
    },
    async updateTaskStatus(id: string, userId: string, to: string) {
        const task = await getTaskById(id)
        if (!task) throw new CustomError(messages.task.not_found, 404)

        const res = await updateTaskStatus(id, userId, to);
        if (!res) throw new CustomError(messages.task.edit_forbidden, 403);

        return res
    },
    async checkRule(from: string, to: string, authorId: string) {
        const rulesDocument = await getRules(authorId);
        const rules = rulesDocument?.rules;
    
        if (rules instanceof Map) {
    
            if (rules.get(from)?.includes(to)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    


}
export default TaskService;