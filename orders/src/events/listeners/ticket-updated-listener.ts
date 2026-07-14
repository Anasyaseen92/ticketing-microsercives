import {Message} from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subject} from '@aytix/common';
import { queueGroupName } from './queue-group-name';
import {Ticket} from '../../models/ticket';

export class TicketUpdatedListener extends Listener<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        const { id, title, price } = data.ticket;
        ticket.set({ title, price });

        await ticket.save();

        msg.ack();
    }
}