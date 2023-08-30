import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiCreatedResponse({ type: CustomerEntity })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return new CustomerEntity(
      await this.customersService.createCustomer(createCustomerDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: CustomerEntity, isArray: true })
  async findAll() {
    const users = await this.customersService.findAllCustomers();
    return users.map((user) => new CustomerEntity(user));
  }

  @Get(':id')
  @ApiOkResponse({ type: CustomerEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new CustomerEntity(await this.customersService.findCustomerById(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CustomerEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return new CustomerEntity(
      await this.customersService.updateCustomer(id, updateCustomerDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CustomerEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new CustomerEntity(
      await this.customersService.removeCustomerById(id),
    );
  }
}
