import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PAY_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'pay',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'order-consumer',
        },
      },
    },
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
