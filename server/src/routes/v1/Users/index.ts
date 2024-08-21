import { Router } from "express";
import UserController from "./controller";
import requireUser from "../../../middleware/requireUser";

const UserRouter = Router({mergeParams: true});

UserRouter.post('/verify/:otp/:email', UserController.verifyOtp);

UserRouter.get('/', requireUser, UserController.getUsers);

UserRouter.get("/logout", requireUser, UserController.logout);

export default UserRouter;