import express from 'express'
import { register } from '../controller/RegisterController.js';
import { login } from '../controller/LoginController.js';
import { Logout } from '../controller/LogoutController.js';
import userAuth from '../middleware/userAuth.js';
import { VerifyAccount, SendVerifyOTP } from '../controller/VerifyAccountController.js';
const authRouter = express.Router();


authRouter.post('/signup',userAuth, register);

authRouter.post('/login',userAuth, login);

authRouter.post('/logout',userAuth, Logout);

authRouter.post('/send-verify-OTP', userAuth ,SendVerifyOTP)

authRouter.post('/verifyOtp', userAuth, VerifyAccount)

export default authRouter;