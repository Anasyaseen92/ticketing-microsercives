import {Subject} from './subject.js';
import {OrderStatus} from './types/order-status.js';

export interface OrderCreatedEvent {
    subject: Subject.OrderCreated;
    data: {
        id: string;
        status: OrderStatus;
        userId: string;
        expiresAt: string;
        ticket: {
            id: string;
            price: number;
        };
    };
}
