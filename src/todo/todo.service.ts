import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { Todo } from './entities/todo.entity';
import { User } from '../users/entities/user.entity';
import { PaginationResult } from '../common/interfaces/pagination.interface';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
        const todo = this.todoRepository.create({
            ...createTodoDto,
            user,
        });
        return this.todoRepository.save(todo);
    }

    async findAll(queryDto: QueryTodoDto, user: User): Promise<PaginationResult<Todo>> {
        const { page = 1, limit = 10, search, completed } = queryDto;
        const skip = (page - 1) * limit;

        const where: FindOptionsWhere<Todo> = { user: { id: user.id } };

        if (search) {
            where.title = Like(`%${search}%`);
        }

        if (completed !== undefined) {
            where.completed = completed;
        }

        const [todos, total] = await this.todoRepository.findAndCount({
            where,
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data: todos,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    async findOne(id: number, user: User): Promise<Todo> {
        const todo = await this.todoRepository.findOne({
            where: { id, user: { id: user.id } },
        });

        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        return todo;
    }

    async update(id: number, updateTodoDto: UpdateTodoDto, user: User): Promise<Todo> {
        const todo = await this.findOne(id, user);
        Object.assign(todo, updateTodoDto);
        return this.todoRepository.save(todo);
    }

    async remove(id: number, user: User): Promise<void> {
        const todo = await this.findOne(id, user);
        await this.todoRepository.remove(todo);
    }

    async getStats(user: User) {
        const total = await this.todoRepository.count({ where: { user: { id: user.id } } });
        const completed = await this.todoRepository.count({
            where: { user: { id: user.id }, completed: true },
        });
        const pending = total - completed;

        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
    }
}