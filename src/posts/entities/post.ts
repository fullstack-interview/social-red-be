import { PartialType } from '@nestjs/swagger';
import { Post } from '../schema/post.schema';

export class PostPayload extends PartialType(Post) {}
