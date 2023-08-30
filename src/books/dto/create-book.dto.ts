import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsArray,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  writer: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  coverImage: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsArray()
  @ApiProperty()
  tags: string[];
}
