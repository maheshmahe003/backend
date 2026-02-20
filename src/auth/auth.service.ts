import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserRegDto } from './auth.dto';

const SALT_ROUNDS = 10;

export type AuthResponse = {
  access_token: string;
  user: any
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: CreateUserRegDto): Promise<string> {
    const user = await this.usersService.create(userData);
    return user.email;
  }

  async logIn(username: string, unhashedPassword: string): Promise<AuthResponse | null> {
    const user = await this.usersService.findByUsername(username);

    if (!user || !(await bcrypt.compare(unhashedPassword, user.password))) {
      return null;
    }

    const payload = { sub: user._id, username: user.email };
    const userdetails = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "patient"

    }
    return {
      user: userdetails,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}