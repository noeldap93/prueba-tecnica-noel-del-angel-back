import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { validatePassword } from 'src/utils/password';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    @Inject() userService: UserService;
    @Inject() config: ConfigService;
    @Inject() jwtService: JwtService;

    admins: Number[];

    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        await this.#validateUser(user, loginDto.password);
        return {
            access_token: this.#createUserAccessToken(user),
        }
    }

    async #validateUser(user?: User, password?: string) {
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if (! await validatePassword(password, user.password)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    #createUserAccessToken(user: User) {
        const data = this.#createUserTokenData(user);
        return this.#signToken(data);
    }


    #createUserTokenData(user: User) {
        return {
            user_id: user.id,
            name: user.name,
            email: user.email,
            admin: this.#isAdmin(user.id),
        };
    }

    #isAdmin(id: number) {
        this.admins = this.admins || this.config.get('ADMINS').split(',').map(Number);
        return this.admins.includes(id);
    }

    #signToken(data: any) {
        return this.jwtService.sign(data);
    }
}
