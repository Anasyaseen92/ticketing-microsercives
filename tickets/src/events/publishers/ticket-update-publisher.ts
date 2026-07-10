import {Publisher, Subject, TicketUpdatedEvent} from '@aytix/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subject.TicketUpdated = Subject.TicketUpdated;
}