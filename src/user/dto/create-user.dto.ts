import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class createUserDto {
    @ApiProperty({
        description: 'The name of the user',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    name: string;

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
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
}
