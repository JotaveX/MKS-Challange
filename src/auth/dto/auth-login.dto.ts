import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class authLoginDto {
    @ApiProperty({
        description: 'The email of the user',
        type: String,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({ 
        description: 'The password of the user',
        type: String,
        required: true,
    })
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
}