import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { createUserDto } from "src/user/dto/create-user.dto";

export class AuthRegisterDto extends createUserDto {
    id?: number 
}