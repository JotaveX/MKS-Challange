import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { authLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";

@ApiCreatedResponse({ description: 'The user has been successfully logged in.' })
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiCreatedResponse({ description: 'The user has been successfully logged in.' })
    @ApiBadRequestResponse({ description: 'The email/password is incorrect.' })
    @Post('/login')
    login(@Body() { email, password }: authLoginDto) {
        return this.authService.login(email, password);
    }

    @ApiBadRequestResponse({ description: 'The email address is already in use.' })
    @ApiCreatedResponse({ description: 'Jwt token has been successfully created.' })
    @Post('/register')
    register(@Body() data: AuthRegisterDto) {
        return this.authService.register(data);
    }
}