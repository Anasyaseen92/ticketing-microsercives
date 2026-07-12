import { NotFoundError } from '@aytix/common/build/errors/not-found-error';
import express,{Request, Response} from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
    const { orderId } = req.params;
const order = await Order.findById(req.params.orderId);
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotFoundError();
    }
    await order.remove();
    res.status(204).send(order);
});

export {router as deleteOrderRouter};