import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BooksRepository } from './books.repository';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  imports: [PrismaModule],
})
export class BooksModule {}
