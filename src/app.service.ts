import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PayCreatedEvent } from './pay-created.event';

@Injectable()
export class AppService {
  constructor(@Inject('PAY_SERVICE') private readonly orderClient: ClientKafka) { }

  getHello(): string {
    return 'Hello World!';
  }

  handlePayCreated(payCreatedEvent: PayCreatedEvent) {
    const { id, name, userId, email } = payCreatedEvent;
    if (userId % 2 == 1) {
      this.orderClient.emit(
        'pay',
        {
          id: id,
          status: 'Confirmed'
        }
        ,
      )
    }
    else {
      this.orderClient.emit(
        'pay',
        {
          id: id,
          status: 'Cancelled'
        }
      )
    };
    console.log(payCreatedEvent);
  }
}
