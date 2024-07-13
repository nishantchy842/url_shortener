import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/loginDto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('/login')
  @ApiBody({ type: SignInDto })
  async login(@Body() user: SignInDto) {
    return await this.authService.login(user.email, user.password);
  }
}
