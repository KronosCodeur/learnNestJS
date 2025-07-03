import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsBoolean, IsInt, IsOptional, IsString, Max, Min} from "class-validator";
import {Transform, Type} from "class-transformer";
import {UserRole} from "../entities/enums/user-role.enum";


export class QueryUserDto {
    @ApiPropertyOptional({ description: 'Page number', minimum: 1, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Number of items per page', minimum: 1, maximum: 100, default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiPropertyOptional({ description: 'Search term for user name or email' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: 'Filter by role', type: 'string', enum: ['user', 'admin'] })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'user') return UserRole.ROLE_USER;
        if (value === 'admin') return UserRole.ROLE_ADMIN;
        return value;
    })
    role?: UserRole;
}