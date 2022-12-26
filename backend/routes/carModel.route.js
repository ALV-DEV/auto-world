import express from 'express';
import carModelController from '../controllers/carModelController.js';
import { checkAuthMiddleware } from '../middleware/checkAuthMiddleware.js';
export const carModelRoute = new express.Router();

carModelRoute.post('/', checkAuthMiddleware, carModelController.create);
carModelRoute.put('/:id', checkAuthMiddleware, carModelController.update);
carModelRoute.get('/by-mark/:markId', carModelController.getByMark);
carModelRoute.delete('/:id', checkAuthMiddleware, carModelController.delete);
