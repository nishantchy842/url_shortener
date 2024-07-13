import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({ default: 'nishant@gmail.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ default: 'pass1234' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
