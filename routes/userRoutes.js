// 


import express from 'express';
import { adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// Admin login route
userRouter.post('/admin', adminLogin);

export default userRouter;