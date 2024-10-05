//https://docs.nestjs.com/security/authentication
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/application/services/auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/infrastructure/guard/jwt-constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/infrastructure/guard/auth.guard';

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
    providers: [
        AuthService, 
        // nest vincula o guard a todos os endpoints do module
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
})
export class AuthModule {}