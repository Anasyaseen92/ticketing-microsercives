import express from 'express';
import bodyParser from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import {NotFoundError} from './errors/not-found-error';
import 'express-async-errors';
import mongoose from 'mongoose';
const app = express();
app.use(bodyParser.json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(errorHandler);
app.all('*', async(req, res, next) =>{
    throw new NotFoundError();
})
app.get('/', (req, res) => {
  res.send('Hi there!');
});
app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!');
});

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
app.listen(3000, () => {
  console.log('Auth service is running on port 3000...');
});
}
start();