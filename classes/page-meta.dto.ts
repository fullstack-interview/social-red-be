import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interfaces/page-meta-dto.interface';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly perPage: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ searchOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = searchOptionsDto.page;
    this.perPage = searchOptionsDto.perPage;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.perPage);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
