import express from 'express';
export const userRouter = new express.Router();

userRouter.get('/profile', (req, res) => {
  res.json({
    message: 'Hello !',
  });
});
