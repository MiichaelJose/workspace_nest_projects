//https://docs.nestjs.com/security/authentication
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/application/services/auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constantes';

@Module({
    imports: [
        UserModule, 
        JwtModule.register({
            global: true, // deixando global, não precisamos importar o JwtModuleem nenhum outro lugar em nosso aplicativo.
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '999s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}