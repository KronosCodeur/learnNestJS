import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, Like, Repository} from 'typeorm';
import {User} from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {QueryUserDto} from "./dto/query-user.dto";
import {PaginationResult} from "../common/interfaces/pagination.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(email: string, username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({
            email,
            username,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { email } });
        return user || undefined;
    }

    async findById(id: number): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { id } });
        return user || undefined;
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async findAll(queryDto: QueryUserDto): Promise<PaginationResult<User>> {
        const { page = 1, limit = 10, search , role} = queryDto;
        const skip = (page - 1) * limit;
        const where: FindOptionsWhere<User> = {};
        if(search){
            where.username = Like(`%${search}%`);
            where.email = Like(`%${search}%`);
        }
        if(role){
            where.role = role;
        }
        const [users,total] = await this.usersRepository.findAndCount({
            where,
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        })
        const totalPages = Math.ceil(total/limit);
        return {
            data: users,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            }
        }
    }
}