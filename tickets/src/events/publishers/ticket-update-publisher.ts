import { Publisher } from '@aytix/common/build/events/base-publisher.js';
import { Subject } from '@aytix/common/build/events/subject.js';
import { TicketUpdatedEvent } from '@aytix/common/build/events/ticket-update-event.js';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subject.TicketUpdated = Subject.TicketUpdated;
}