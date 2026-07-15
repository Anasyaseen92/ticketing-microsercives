import {
  Listener,
  TicketCreatedEvent,
  Subject,
} from '@aytix/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
  queueGroupName = 'orders-service';

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    }); 

    msg.ack();
  }
}