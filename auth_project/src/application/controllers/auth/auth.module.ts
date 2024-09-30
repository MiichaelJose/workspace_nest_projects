import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/application/services/auth.service';
import { UserModule } from '../users/user.module';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}