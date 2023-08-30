import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  findAll(request: Request) {
    return this.prisma.order.findMany({
      where: {
        customerId: request.user['id'],
      },
      include: {
        customer: true,
        book: true,
      },
    });
  }

  findById(id: number, request: Request) {
    return this.prisma.order.findUnique({
      where: { id, customerId: request.user['id'] },
      include: {
        customer: true,
        book: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
