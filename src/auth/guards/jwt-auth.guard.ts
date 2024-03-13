import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   // const request = context.switchToHttp().getRequest();
  //   // console.log(
  //   //   '🚀 ~ JwtAuthGuard ~ classJwtAuthGuardextendsAuthGuard ~ request:',
  //   //   request,
  //   // );
  //   return true;
  // }
}
