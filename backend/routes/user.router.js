import express from 'express';
export const userRouter = new express.Router();
import authController from '../controllers/authController.js';
import { checkAuthMiddleware } from '../middleware/checkAuthMiddleware.js';

userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
userRouter.get('/', authController.getProfile);
userRouter.post('/upload', checkAuthMiddleware, authController.uploadAvatar);
userRouter.delete('/upload', checkAuthMiddleware, authController.delteAvatar);
