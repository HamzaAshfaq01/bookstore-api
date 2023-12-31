import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomersModule } from 'src/customers/customers.module';
import { JwtStrategy } from './jwt.strategy';
import { CustomersRepository } from 'src/customers/customers.repository';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    }),
    CustomersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CustomersRepository],
})
export class AuthModule {}
