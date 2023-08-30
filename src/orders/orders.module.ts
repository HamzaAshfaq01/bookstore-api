import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersRepository } from './orders.repository';
import { BooksRepository } from 'src/books/books.repository';
import { CustomersRepository } from 'src/customers/customers.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    BooksRepository,
    CustomersRepository,
  ],
  imports: [PrismaModule],
  exports: [OrdersService],
})
export class OrdersModule {}
