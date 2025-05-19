import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
