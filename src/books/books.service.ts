import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async createBook(createBookDto: CreateBookDto) {
    return await this.booksRepository.create(createBookDto);
  }

  async findAllBooks() {
    return await this.booksRepository.findAll();
  }

  async findBookById(id: number) {
    const book = await this.booksRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async updateBookById(id: number, updateBookDto: UpdateBookDto) {
    const isBookExits = await this.booksRepository.findById(id);
    if (!isBookExits) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return await this.booksRepository.updateById(id, updateBookDto);
  }

  async deleteBookById(id: number) {
    const isBookExits = await this.booksRepository.findById(id);
    if (!isBookExits) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return await this.booksRepository.removeById(id);
  }
}
