import express from 'express';
import carMarkController from '../controllers/carMarkController.js';
import { checkAuthMiddleware } from '../middleware/checkAuthMiddleware.js';
export const carMarkRoute = new express.Router();

carMarkRoute.post('/', checkAuthMiddleware, carMarkController.create);
carMarkRoute.put('/:id', checkAuthMiddleware, carMarkController.update);
carMarkRoute.get('/', carMarkController.getAll);
