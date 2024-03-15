import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { JoinOptionsInterface } from '../interfaces/join-options.interface';

export class SearchOptionsDto implements JoinOptionsInterface {
  @ApiPropertyOptional({
    minimum: 0,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 100,
    default: 20,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  readonly perPage?: number = 20;

  @ApiPropertyOptional({ default: 'createdAt:ASC' })
  @IsString()
  @IsOptional()
  readonly sortBy?: string = 'createdAt:ASC';

  @ApiPropertyOptional({ default: 'name:val' })
  @IsString()
  @IsOptional()
  filter?: string;

  @ApiPropertyOptional({ default: 'entityA:attrA|attrb,entityB:attrA|attrb' })
  @IsString()
  @IsOptional()
  readonly join?: string;

  @ApiPropertyOptional({ default: 'entityA,entityB' })
  @IsString()
  @IsOptional()
  readonly joinAndCount?: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  readonly includeDeleted?: boolean;

  get skip(): number {
    return (this.page - 1) * this.perPage;
  }

  addFilter(attribute: string, value: string) {
    this.filter = this.filter
      ? `${this.filter},${attribute}:${value}`
      : `${attribute}:${value}`;
  }
}
