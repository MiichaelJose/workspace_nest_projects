import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { Roles } from 'src/domain/decorators/roles.decorators';
import { Role } from 'src/domain/enums/role.enum';
import { CreateUserDTO } from 'src/interfaces/dto/create-user.dto';
import { QueryUserDTO } from 'src/interfaces/dto/query-user.dto';
import { UpdateUserDTO } from 'src/interfaces/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.create(createUserDTO);
  }

  @Get()
  async findAll(@Query() query: QueryUserDTO) {
    const users = await this.userService.findAll(query);
    
    return {
      data: users,
      currentPage: query.page,
      limit: query.limit,
    }
  }

  @Get(":id")
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return `user #${id} alt name ${updateUserDTO.name}`;
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `user ${id} deleted`;
  }
}
