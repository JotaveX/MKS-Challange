import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { user } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/user.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly prisma: PrismaService,
                private readonly userService: UserService
    ) {}

    createToken(user:user) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
            })
        }
    }

    checkToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    async register(data: AuthRegisterDto) {
        const user = await this.userService.create(data);

        return this.createToken(user);
    }

    async login(email:string, password:string) {

        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        return this.createToken(user);

    }
}