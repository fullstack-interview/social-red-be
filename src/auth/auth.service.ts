import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password, email } = userObject;

    const plainToHash = await hash(password, 10);

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) throw new HttpException('EMAIL_IN_USE', 403);

    userObject = { ...userObject, password: plainToHash };

    const createdUser = await this.userRepository.save(userObject);

    const token = await this.jwtAuthService.sign({
      id: createdUser.id,
      full_name: createdUser.full_name,
      email: createdUser.email,
    });

    return {
      token,
      user: createdUser,
    };
  }

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const token = await this.jwtAuthService.sign({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
    });

    const data = {
      user,
      token,
    };

    return data;
  }
}
