import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUrlDto {
    @ApiProperty({
        example: 'string'
    })
    @IsString()
    @IsNotEmpty()
    readonly originalUrl: string
}
