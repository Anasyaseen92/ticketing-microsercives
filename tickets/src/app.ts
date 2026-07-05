import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@aytix/common';
import { newTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.COOKIE_SECURE === 'true'
    })
);
app.use(currentUser);

app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };