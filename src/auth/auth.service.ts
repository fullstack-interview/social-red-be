import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { UserPayload } from 'src/user/entities/user.entity';
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

  async register(userObject: RegisterAuthDto): Promise<UserPayload> {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };

    const createdUser = this.userRepository.save(userObject);

    return createdUser as UserPayload;
  }

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const findUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!findUser) throw new NotFoundException('USER_NOT_FOUND');

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const token = await this.jwtAuthService.sign({
      id: findUser.id,
      name: findUser.full_name,
      email: findUser.email,
    });

    const data = {
      findUser,
      token,
    };

    return data;
  }
}
