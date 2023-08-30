import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { CustomersRepository } from 'src/customers/customers.repository';
import { BooksRepository } from 'src/books/books.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private customersRepository: CustomersRepository,
    private booksRepository: BooksRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const bookId = createOrderDto.bookId;
    const customerId = createOrderDto.customerId;
    const book = await this.booksRepository.findById(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    const customer = await this.customersRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    if (customer.points < book.price) {
      throw new Error('Insufficient points');
    }
    createOrderDto.price = book.price;
    const order = await this.ordersRepository.create(createOrderDto);

    await this.customersRepository.decrementPoints(
      customer.id,
      customer.points - book.price,
    );
    return order;
  }

  async findAll(request: Request) {
    return await this.ordersRepository.findAll(request);
  }

  async findOne(id: number, request: Request) {
    return await this.ordersRepository.findById(id, request);
  }

  async remove(id: number, request: Request) {
    const order = await this.ordersRepository.findById(id, request);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await this.customersRepository.incrementPoints(
      order.customerId,
      order.book.price,
    );
    return await this.ordersRepository.remove(id);
  }
}
