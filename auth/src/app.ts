import express from 'express';
import bodyParser from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { errorHandler } from '@aytix/common';
import {NotFoundError} from '@aytix/common';
import 'express-async-errors';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(cookieSession({
  signed: false,
  secure: false,
  sameSite: 'lax',
}));
app.use(bodyParser.json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.all('*', async(req, res, next) =>{
    throw new NotFoundError();
})
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hi there!');
});
app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!');
});


export { app };