import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { userRouter } from './routes/user.router.js';

dotenv.config();

const app = express();

app.use(express.json());
const __dirname = path.resolve();
app.use('/static', express.static(path.join(__dirname, '/static')));

//routes

app.use('/api/auth', userRouter);

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log('DB connection success'))
      .catch((err) => console.log(err));
    app.listen(PORT, () =>
      console.log(`Server running in ${process.env.NODE_ENV} mode, on PORT ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
