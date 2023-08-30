import { Order } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerEntity } from 'src/customers/entities/customer.entity';

export class OrderEntity implements Order {
  constructor({ customer, ...data }: Partial<OrderEntity>) {
    Object.assign(this, data);

    console.log(customer, 'customer');

    if (customer) {
      this.customer = new CustomerEntity(customer);
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  bookId: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false, type: CustomerEntity })
  customer?: CustomerEntity;
}
