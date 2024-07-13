import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'username',
    })
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @ApiProperty({
        example: 'test@gamil.com',
    })
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty({
        example: 'pass',
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;

}
