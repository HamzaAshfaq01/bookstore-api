import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersRepository {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findById(id: number) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.customer.findUnique({ where: { email } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  decrementPoints(id: number, pointsToUpdate: number) {
    return this.prisma.customer.update({
      where: { id },
      data: { points: { decrement: pointsToUpdate } },
    });
  }

  incrementPoints(id: number, pointsToUpdate: number) {
    return this.prisma.customer.update({
      where: { id },
      data: { points: { increment: pointsToUpdate } },
    });
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
