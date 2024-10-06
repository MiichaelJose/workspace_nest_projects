import {User} from 'src/domain/entities/user.schema';
import {CreateUserDTO} from 'src/interfaces/dto/create-user.dto';
import {QueryUserDTO} from 'src/interfaces/dto/query-user.dto';

export interface IUserRepository {
    create(createUserDTO: CreateUserDTO): Promise<User>
    findAll(query: QueryUserDTO): Promise<User[]>
    findOne(id: string): Promise<User>
    findOneByEmail(email: string): Promise<User | any>
}
