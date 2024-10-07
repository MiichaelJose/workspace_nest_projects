import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "src/application/services/auth.service";
import { SkipAuth } from "src/domain/decorators/roles.decorators";
import { GoogleOauthGuard } from "src/infrastructure/guard/google-oauth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // alterar para password-local
  //https://docs.nestjs.com/recipes/passport#implement-protected-route-and-jwt-strategy-guards
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @SkipAuth()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
    // Inicia o fluxo de autenticação
    console.log(req);
    
  }

  @SkipAuth()
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {
    // Lida com o callback e autentica o usuário
    return {
      message: 'Usuário autenticado com sucesso',
      user: req.user,
    };
  }
}