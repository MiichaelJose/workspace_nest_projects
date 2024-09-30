import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { CreateUserDTO } from 'src/interfaces/dto/create-user.dto';
import { UpdateUserDTO } from 'src/interfaces/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.create(createUserDTO);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  async findOneByEmail(email: string) {
    return await this.userService.findOneByEmail(email);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return `user #${id} alt name ${updateUserDTO.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `user ${id} deleted`;
  }
}
