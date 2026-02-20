import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRegDto, UserLoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserRegDto) {
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body() loginUserDto: UserLoginDto) {
    const { username, password } = loginUserDto;
    
    const token = await this.authService.logIn(username, password);

    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }
}