import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModule: Model<UserDocument>,
  ) {}

  async findAll() {
    const users = this.userModule.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModule.findById(id);
    return user;
  }

  async update(updateUser: UpdateUserDto, id: string) {
    const updatedUser = await this.userModule.findByIdAndUpdate(
      { _id: id },
      updateUser,
    );
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userModule.deleteOne({ _id: id });
    return deletedUser;
  }
}
