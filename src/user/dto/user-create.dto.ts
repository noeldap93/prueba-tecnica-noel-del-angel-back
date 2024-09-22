import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @ApiProperty({ minimum: 8 })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}