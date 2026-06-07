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
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(cookieSession({
  signed: false,
  secure: true
}));
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
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
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