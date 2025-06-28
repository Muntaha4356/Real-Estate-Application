import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controller/useInfoController.js';
import { updateUserData } from '../controller/UserController/updateUserInfo.js';


const userRoutes= express.Router();

userRoutes.get('/data', userAuth, getUserData)
userRoutes.put('/updateUser',userAuth, updateUserData)


export default userRoutes;
