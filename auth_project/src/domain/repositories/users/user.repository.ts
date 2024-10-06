import {User} from 'src/domain/entities/user.schema';
import {CreateUserDTO} from 'src/interfaces/dto/create-user.dto';
import {IUserRepository} from './user.interface';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {QueryUserDTO} from 'src/interfaces/dto/query-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);
    return await createdUser.save();
  }

  async findAll(query: QueryUserDTO): Promise<User[]> {
    const {limit, page} = query;

    const skip = (page - 1) * limit;

    return await this.userModel.find()
        .skip(skip)
        .sort({createdAt: -1})
        .limit(limit);
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | any> {
    return await this.userModel.findOne({email});
  }
}
