import { PartialType } from '@nestjs/swagger';
import { User } from '../schema/user.schema';

export class UserPayload extends PartialType(User) {
  deleted_at?: string;
}
