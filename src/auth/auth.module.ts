import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middleware';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
