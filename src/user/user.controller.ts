import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindOneOptionsDto } from 'classes/findone-options.dto';
import { SearchOptionsDto } from 'classes/search-options.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() searchOptionsDto: SearchOptionsDto) {
    return this.userService.findAll(searchOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() findOneOptionsDto: FindOneOptionsDto,
  ) {
    return this.userService.findOne(id, findOneOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(updateUserDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
