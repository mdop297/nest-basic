import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // 1.check email is in use
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    // 2.Hash the user password
    // 2.1 Generate a salt
    const salt = randomBytes(8).toString('hex');
    // 2.2 Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // 2.3 join the hash and salt together
    const result = salt + '.' + hash.toString('hex');
    // 3.Create a new user and save it
    const user = await this.userService.create(email, result);
    // 4.Return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      console.log(user);
      return user;
    } else {
      throw new BadRequestException('Wrong password');
    }
  }

  async currentUser(userId: number) {
    return this.userService.findOne(userId);
  }
}
