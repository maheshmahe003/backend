import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRegDto } from 'src/auth/auth.dto';
const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
    async create(userData: CreateUserRegDto) {
        return userData
    }

    async findByUsername(username: string) {
        const USERS_LIST = [
            {
                _id: 87562,
                name: "Mahesh Jadegowda",
                email: "maheshmahe003@gmail.com",
                password: await bcrypt.hash('Mahesh@123', SALT_ROUNDS)
            }
        ]
        const user = USERS_LIST.find(user => user.email === username)
        return user
    }
}
