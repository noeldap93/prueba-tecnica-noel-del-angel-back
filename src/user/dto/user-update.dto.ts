import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UserUpdateDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ minimum: 8, required: false, description: 'If not provided, password will not be updated' })
    @IsString()
    @IsOptional()
    @MinLength(8)
    password?: string;
}