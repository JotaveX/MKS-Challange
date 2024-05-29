import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { authLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    login(@Body() { email, password }: authLoginDto) {
        return this.authService.login(email, password);
    }

    @Post('/register')
    register(@Body() data: AuthRegisterDto) {
        return this.authService.register(data);
    }
}