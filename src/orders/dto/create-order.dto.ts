import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
