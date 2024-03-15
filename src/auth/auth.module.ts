import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } from 'src/config';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: JWT_EXPIRATION_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
