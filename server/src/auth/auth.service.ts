/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async login(email: string, pass: string): Promise<any> {
        try {
            const user = await this.userService.findByEmail(email);

            const comparePass = await bcrypt.compare(pass, user.password);

            if (user && comparePass) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user;
                const payload = {
                    sub: user.id,
                    username: user.fullName,
                    email: user.email,
                };
                return {
                    data: user,
                    token: this.jwtService.sign(payload, {
                        expiresIn: this.configService.get('TOKEN_EXPIRATION'),
                    }),
                };
            }
            return null;
        } catch (error) {
            throw new BadRequestException('Invalid credential');
        }
    }

    //used to create token


    async verifyJwt(token: string) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });

            return payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async logout(res: Response) {
        return await res.clearCookie('token').status(200).json({
            message: 'logout successfully',
        });
    }
}
