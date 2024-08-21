import { NextFunction, Request, Response } from "express";
import CustomError, { errorHandler } from "../../../utils/Error";
import InputValidation from "../../../utils/InputValidation";
import { messages } from "../../../utils/Messages";
import { successResponse } from "../../../utils/HttpResponse";
import TagsServices from "./service";
import { Tag } from "./model";

const TagsController = {
    async createTag(req: Request<{taskId: string}, unknown, Tag>, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.params;
            const { name } = req.body;
            InputValidation.validateid(taskId)

            const result = await TagsServices.createTag(name, taskId)

            if (!result) throw new CustomError(messages.tag.creation_failed, 500)

            return successResponse({
                message: messages.tag.creation_success,
                response: res,
                data: result,
                status: 201
            })

        } catch (error) {
            next(errorHandler(res, error))
        }

    },
    async getTag(req: Request<{ tagId: string }, unknown, unknown>, res: Response, next: NextFunction) {
        try {
            const { tagId } = req.params;
            InputValidation.validateid(tagId)

            const result = await TagsServices.getTag(tagId);
            if (!result) throw new CustomError(messages.tag.not_found, 404)
            return successResponse({
                message: messages.tag.creation_success,
                response: res,
                data: result,
                status: 200
            })

        } catch (error) {
            next(errorHandler(res, error))
        }
    },
    async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await TagsServices.getAllTags()
        return successResponse({
            message: messages.tag.tags_found,
            response: res,
            data: result,
            status: 200
        })
        
    } catch (error) {
        next(errorHandler(res, error))
    }},
    async getTasksByTag(req: Request<{query: string}>, res: Response, next:NextFunction){
        try {
            console.log(req.params.query)
            const {query} = req.params

            const result = await TagsServices.getTasksByTag(query)
            return successResponse(
                {
                    message: messages.tag.tasks_found,
                    response: res,
                    data: result,
                    status: 200
                }
            )
            
        } catch (error) {
            next(errorHandler(res, error))
        }
    }
}
export default TagsController;