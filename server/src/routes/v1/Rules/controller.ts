import { Request, Response, NextFunction } from 'express';
import RuleServices from './service';
import { successResponse } from '../../../utils/HttpResponse';
import { messages } from '../../../utils/Messages';
import { errorHandler } from '../../../utils/Error';
import InputValidation from '../../../utils/InputValidation';

const RuleController = {
  async getRules(req: Request, res: Response, next: NextFunction) {
    try {
      const authorId = res.locals.user as { _id: string };
      const result = await RuleServices.getRules(authorId._id);
      if(!result) throw new Error(messages.rule.not_found);
      return successResponse({
        response: res,
        message: messages.rule.get_success,
        status: 200,
        data: result,
      });
    } catch (error) {
      next(errorHandler(res, error));
    }
  },

  async updateRules(req: Request, res: Response, next: NextFunction) {
    try {
      const authorId = res.locals.user as { _id: string };
      InputValidation.validateid(authorId._id);
  
      const rules: { [key: string]: string[] } = req.body;
      InputValidation.validaterules(rules);
  
      let result;
      const existing = await RuleServices.getRules(authorId._id);
      if (!existing) {
          result = await RuleServices.createRules(authorId._id, rules);
      } else {
          result = await RuleServices.updateRules(authorId._id, rules);
      }
  
      return successResponse({
          response: res,
          message: messages.rule.update_success,
          status: 200,
          data: result,
      });
  } catch (error) {
      next(errorHandler(res, error));
  }
  },
};

export default RuleController;
