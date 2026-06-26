import express, { Request, Response } from 'express';
import {requireAuth, validateRequest} from '@aytix/common';
import { body } from 'express-validator';
const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .not()
        .isEmpty()
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number')
],validateRequest, async (req: Request, res: Response) => {
    res.send(200);
});

export { router as newTicketRouter };