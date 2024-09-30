import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/entities/user.schema';
import { CreateUserDTO } from 'src/interfaces/dto/create-user.dto';

@Injectable()
export class UserService {  
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const createdUser = new this.userModel(createUserDTO);
        return await createdUser.save();
    }
    
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findOneByEmail(email: string): Promise<User | any> {
        return await this.userModel.find(user => user.email === email);
    }
}
