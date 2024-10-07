import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.schema';
import { UserRepository } from 'src/domain/repositories/users/user.repository';
import { CreateUserDTO } from 'src/interfaces/dto/create-user.dto';
import { QueryUserDTO } from 'src/interfaces/dto/query-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {  
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(createUserDTO.password, salt);
        createUserDTO.password = hash
        return await this.userRepository.create(createUserDTO);
    }
    
    async findAll(query: QueryUserDTO): Promise<User[]> {
        return await this.userRepository.findAll(query);
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async findOneByEmail(email: string): Promise<User | any> {
        return await this.userRepository.findOneByEmail(email);
    }
}
