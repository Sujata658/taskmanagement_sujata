import { NextFunction, Response, Request } from "express";
import { ActivityModel } from "../routes/v1/Activities/model";
import { Activities } from "../enums/activities";

export const logActivity = (action: string, actionOnn:string, details?: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.statusCode < 400) {
      const author = res.locals.user as { _id: string; name: string };
      const actionOn = res.locals.actionOn as { _id: string };

        if(actionOnn == 'Task' && action === Activities.UpdateTaskStatus){
          const from = req.params.from;
          const to = req.params.to;
          const activity = new ActivityModel({
            author: author._id,
            actionOn: actionOn._id,
            actionOnModel: actionOnn,
            action,
            details,
            from,
            to,
          });
          try {
            const savedActivity = await activity.save();
            if (!savedActivity) {
              throw new Error('Error saving activity');
            }
          } catch (error) {
            console.error('Error saving activity:', error);
          }

        }else{
          const activity = new ActivityModel({
            author: author._id,
            actionOn: actionOn._id,
            actionOnModel: actionOnn,
            action,
            details,
          });
          try {
            const savedActivity = await activity.save();
            if (!savedActivity) {
              throw new Error('Error saving activity');
            }
          } catch (error) {
            console.error('Error saving activity:', error);
          }
        }
    }
  } catch (error) {
    next(error);
  }
};
