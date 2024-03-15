import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchOptionsDto } from 'classes/search-options.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@ApiBearerAuth()
@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() searchOptionsDto: SearchOptionsDto) {
    return this.postsService.findAll(searchOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateUserDto: UpdatePostDto, @Param('id') id: string) {
    return this.postsService.update(updateUserDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
