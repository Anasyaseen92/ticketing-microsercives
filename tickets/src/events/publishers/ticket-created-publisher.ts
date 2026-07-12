import { Publisher } from '@aytix/common/build/events/base-publisher.js';
import { Subject } from '@aytix/common/build/events/subject.js';
import { TicketCreatedEvent } from '@aytix/common/build/events/ticket-created-event.js';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
}