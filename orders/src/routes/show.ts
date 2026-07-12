import express,{Request, Response} from 'express';
import { Order } from '../models/order';
import { NotFoundError } from '@aytix/common/build/errors/not-found-error';

const router = express.Router();

router.get('/api/orders/:orderId', async (req: Request, res: Response) => {
   const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotFoundError();
    }
    res.send(order);
});

export {router as showOrderRouter};