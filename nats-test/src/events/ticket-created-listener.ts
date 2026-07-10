import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subject } from './subject';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject : Subject.TicketCreated = Subject.TicketCreated;
  queueGroupName = 'payments-service'
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);
    msg.ack();
  }
}