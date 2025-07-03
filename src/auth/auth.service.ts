import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshToken} from "./entities/resfresh-token.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {LoginResultDto} from "./dto/login-result.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(RefreshToken)
        private refreshTokenRepository: Repository<RefreshToken>,
    ) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const user = await this.usersService.create(
            registerDto.email,
            registerDto.username,
            registerDto.password,
        );

        return {
            message: 'User account created successfully',
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await this.usersService.validatePassword(
            loginDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { accessToken, refreshToken } = await this.generateTokens(user);

        return {
            user,
            accessToken,
            refreshToken,
        };

    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<Omit<LoginResultDto, 'user'>> {
        const { refreshToken } = refreshTokenDto;

        // Find the refresh token
        const storedToken = await this.refreshTokenRepository.findOne({
            where: { token: refreshToken, isRevoked: false },
            relations: ['user'],
        });

        if (!storedToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (storedToken.expiresAt < new Date()) {
            await this.revokeRefreshToken(storedToken.id);
            throw new UnauthorizedException('Refresh token expired');
        }

        // Revoke the old refresh token
        await this.revokeRefreshToken(storedToken.id);

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(storedToken.user);

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }

    async logout(refreshToken: string): Promise<void> {
        const storedToken = await this.refreshTokenRepository.findOne({
            where: { token: refreshToken },
        });

        if (storedToken) {
            await this.revokeRefreshToken(storedToken.id);
        }
    }

    async logoutAll(userId: number): Promise<void> {
        await this.revokeAllUserTokens(userId);
    }

    private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
        const payload: TokenPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        // Generate access token
        const accessToken = this.jwtService.sign(payload);

        // Generate refresh token
        const refreshToken = this.generateRefreshToken();

        // Store refresh token in database
        await this.storeRefreshToken(refreshToken, user.id);

        return {
            accessToken,
            refreshToken,
        };
    }

    private generateRefreshToken(): string {
        return crypto.randomUUID();
    }

    private async storeRefreshToken(token: string, userId: number): Promise<void> {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

        const refreshToken = this.refreshTokenRepository.create({
            token,
            userId,
            expiresAt,
        });

        await this.refreshTokenRepository.save(refreshToken);
    }

    private async revokeRefreshToken(tokenId: number): Promise<void> {
        await this.refreshTokenRepository.update(tokenId, { isRevoked: true });
    }

    private async revokeAllUserTokens(userId: number): Promise<void> {
        await this.refreshTokenRepository.update(
            { userId, isRevoked: false },
            { isRevoked: true }
        );
    }
}
