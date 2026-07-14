import { Subject, Publisher, OrderCancelledEvent } from "@aytix/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subject.OrderCancelled = Subject.OrderCancelled;
}