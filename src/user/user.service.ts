import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptionsDto } from 'classes/findone-options.dto';
import { PageDto } from 'classes/page.dto';
import { SearchOptionsDto } from 'classes/search-options.dto';
import {
  getFindOneOptions,
  getPaginatedSearchResult,
} from 'helpers/query-builder.helper';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(searchOptionsDto: SearchOptionsDto): Promise<PageDto<User>> {
    return getPaginatedSearchResult(searchOptionsDto, this.userRepository);
  }

  async findOne(id: string, findOneOptionsDto?: FindOneOptionsDto) {
    const options = getFindOneOptions({ id }, findOneOptionsDto);

    return this.userRepository.findOne(options);
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    return this.userRepository.update(
      {
        id,
      },
      updateUserDto,
    );
  }

  async delete(id: string) {
    return this.userRepository.delete({ id });
  }
}
