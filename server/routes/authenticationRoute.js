import express from 'express'
import { register } from '../controller/RegisterController.js';
import { login } from '../controller/LoginController.js';
import { Logout } from '../controller/LogoutController.js';
const authRouter = express.Router();


authRouter.post('/signup', register);

authRouter.post('/login', login);

authRouter.post('/logout', Logout);

export default authRouter;