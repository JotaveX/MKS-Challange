import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class createMovieDto {
    @ApiProperty({
        description: 'The title of the movie',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'The year of the movie',
        type: Number,
        required: true,
    })
    @IsNotEmpty()
    @IsPositive()
    year: number;

    @ApiProperty({
        description: 'The genre of the movie',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    genre: string;

    @ApiProperty({
        description: 'The author of the movie',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    author: string;
}