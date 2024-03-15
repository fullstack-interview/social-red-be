import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { JoinOptionsInterface } from '../interfaces/join-options.interface';

export class FindOneOptionsDto implements JoinOptionsInterface {
  @ApiPropertyOptional({ default: 'entityA:attrA|attrb,entityB:attrA|attrb' })
  @IsString()
  @IsOptional()
  readonly join?: string;
}
