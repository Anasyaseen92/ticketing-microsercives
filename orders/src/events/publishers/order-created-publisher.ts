import {Publisher, Subject, OrderCreatedEvent} from '@aytix/common';


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated;
}
