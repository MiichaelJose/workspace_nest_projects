//https://docs.nestjs.com/security/authentication
import { Get, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/interfaces/dto/create-user.dto';
import { SkipAuth } from 'src/domain/decorators/roles.decorators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @SkipAuth()
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email) as CreateUserDTO;

    const isMatch = await bcrypt.compare(pass, user.password);
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user._id, username: user.name, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  @Get("profile")
  async isProfile(@Request() req) {
    return req.user
  }
}