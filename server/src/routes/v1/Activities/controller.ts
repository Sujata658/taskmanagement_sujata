import { NextFunction, Request, Response } from "express";

import { successResponse } from "../../../utils/HttpResponse";
import ActivitiesService from "./service";
import { errorHandler } from "../../../utils/Error";

const ActivitiesController = {
    async getActivities(req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user as { _id: string };
        const activities = await ActivitiesService.getActivities(user._id);
        return successResponse({
            response: res,
            message: "Activities fetched successfully",
            status: 200,
            data: activities,
            });
        } catch (error) {
            next(errorHandler(res, error));
        }
    },
    };
    export default ActivitiesController;