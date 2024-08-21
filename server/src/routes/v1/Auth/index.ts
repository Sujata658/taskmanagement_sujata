import { Router } from 'express';
import AuthController from './controller';

const auth = Router();

// Signup
auth.route('/signup').post(AuthController.signup);


// Login
auth.route('/login').post(AuthController.login);


auth.route('/renewAccessToken').post(AuthController.renewAccessToken);

export default auth;
