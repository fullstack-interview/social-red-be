import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'contrasena',
  database: 'inlaze-fullstack',
  synchronize: true,
  autoLoadEntities: true,
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: false }),
    typeOrmModule,
    AuthModule,
    UserModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
