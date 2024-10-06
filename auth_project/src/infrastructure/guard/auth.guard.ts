//https://docs.nestjs.com/security/authentication
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from './jwt-constants';
import { IS_PUBLIC_KEY, ROLES_KEY } from 'src/domain/decorators/roles.decorators';
import { Role } from 'src/domain/enums/role.enum';
//Os guards sao executados depois de todos os middlewares
//proteger endpoints exigindo que um JWT válido esteja presente na solicitação. 
//Faremos isso criando um AuthGuardque podemos usar para proteger nossas rotas.
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    //https://docs.nestjs.com/fundamentals/execution-context
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const varContext = [context.getHandler(), context.getClass()]
        // constexto HTPP
        const request = context.switchToHttp().getRequest();
        const { user } = request

        // SKIP AUTH no contexto UserController, funcao (sigin...)
        const isSkipAuth = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, varContext)

        if(isSkipAuth) {
            return true;
        }

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();//https://docs.nestjs.com/exception-filters trabalhar com exceptions
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {secret: jwtConstants.secret}
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        // VERIFICA o contexto UserController e funcao (create, delete...) que necessita da role 
        const handlesRequiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, varContext);
        const checkRoleUser = Array.isArray(handlesRequiredRoles)
        
        if(checkRoleUser) {
            return handlesRequiredRoles.some((role) => user.role?.includes(role))
        }

        return true
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}