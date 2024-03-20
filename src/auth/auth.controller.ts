import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Res() res, @Body() userObject: RegisterAuthDto) {
    const response = await this.authService.register(userObject);
    return res.status(HttpStatus.OK).json(response);
  }

  @Post('login')
  async loginUser(@Res() res, @Body() userObject: LoginAuthDto) {
    const response = await this.authService.login(userObject);
    return res.status(HttpStatus.OK).json(response);
  }
}
