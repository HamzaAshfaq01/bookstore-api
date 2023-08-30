import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './customers.repository';

export const roundsOfHashing = 10;

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const isEmailExits = await this.customersRepository.findByEmail(
      createCustomerDto.email,
    );
    if (isEmailExits) {
      throw new HttpException(
        `User with email '${createCustomerDto.email}' already exists`,
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await bcrypt.hash(
      createCustomerDto.password,
      roundsOfHashing,
    );
    createCustomerDto.password = hashedPassword;
    return await this.customersRepository.create(createCustomerDto);
  }

  async findAllCustomers() {
    return await this.customersRepository.findAll();
  }

  async findCustomerById(id: number) {
    return await this.customersRepository.findById(id);
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    const user = await this.customersRepository.findByEmail(
      updateCustomerDto.email,
    );
    if (!user) {
      throw new NotFoundException(
        `User with this ${updateCustomerDto.email} email not exits`,
      );
    }
    if (updateCustomerDto.password) {
      updateCustomerDto.password = await bcrypt.hash(
        updateCustomerDto.password,
        roundsOfHashing,
      );
    }
    return await this.customersRepository.update(id, updateCustomerDto);
  }

  async decrementCustomerPoints(id: number, points: number) {
    return await this.customersRepository.decrementPoints(id, points);
  }

  async incrementCustomerPoints(id: number, points: number) {
    return await this.customersRepository.incrementPoints(id, points);
  }

  async removeCustomerById(id: number) {
    const user = await this.customersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(
        `User with this ${user.email} email not exits`,
      );
    }
    return await this.customersRepository.remove(id);
  }
}
