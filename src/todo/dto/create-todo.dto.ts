import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiProperty({ example: 'Learn NestJS' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: 'Complete the NestJS tutorial' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: false })
    @IsBoolean()
    @IsOptional()
    completed?: boolean = false;
}