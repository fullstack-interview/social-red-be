import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'classes/page.dto';
import { SearchOptionsDto } from 'classes/search-options.dto';
import { getPaginatedSearchResult } from 'helpers/query-builder.helper';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findOne(id: string) {
    return await this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(searchOptionsDto: SearchOptionsDto): Promise<PageDto<Post>> {
    return getPaginatedSearchResult(searchOptionsDto, this.postRepository);
  }

  async create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  async update(updatePostDto: UpdatePostDto, id: string) {
    return this.postRepository.update(
      {
        id,
      },
      updatePostDto,
    );
  }

  async delete(id: string) {
    return this.postRepository.delete({ id });
  }
}
