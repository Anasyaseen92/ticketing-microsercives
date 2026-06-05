import express from 'express';
import bodyParser from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
const app = express();
app.use(bodyParser.json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Hi there!');
});
app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!');
});
app.listen(3000, () => {
  console.log('Auth service is running on port 3000...');
});