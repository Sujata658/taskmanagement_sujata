import { Router } from "express";
import requireUser from "../../../middleware/requireUser";
import RuleController from "./controller";

const RuleRouter = Router();

// Get rules
RuleRouter.route('/').get(requireUser, RuleController.getRules);


// Update rules
RuleRouter.route('/').patch(requireUser, RuleController.updateRules);


export default RuleRouter;