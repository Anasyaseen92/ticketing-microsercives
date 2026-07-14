import {
  Listener,
  TicketCreatedEvent,
  Subject,
} from '@aytix/common';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
  queueGroupName = 'orders-service';

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    console.log(id, title, price);

    msg.ack();
  }
}