import {Subject} from './subject.js';
import {OrderStatus} from './types/order-status.js';

export interface OrderCancelledEvent {
    subject: Subject.OrderCancelled;
    data: {
        id: string;
        ticket: {
            id: string;
        };
    };
}