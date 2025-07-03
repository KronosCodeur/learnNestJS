import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Request,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Todos')
@Controller('api/todos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new todo' })
    @ApiResponse({ status: 201, description: 'Todo created successfully' })
    async create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
        const data = await this.todoService.create(createTodoDto, req.user);
        return {
            message: 'Todo created successfully',
            data,
        };
    }

    @Get()
    @ApiOperation({ summary: 'Get all todos with pagination and filtering' })
    @ApiResponse({ status: 200, description: 'Todos retrieved successfully' })
    async findAll(@Query() queryDto: QueryTodoDto, @Request() req) {
        const result = await this.todoService.findAll(queryDto, req.user);
        return {
            message: 'Todos retrieved successfully',
            ...result,
        };
    }

    @Get('stats')
    @ApiOperation({ summary: 'Get user todos statistics' })
    @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
    async getStats(@Request() req) {
        const data = await this.todoService.getStats(req.user);
        return {
            message: 'Statistics retrieved successfully',
            data,
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a todo by ID' })
    @ApiResponse({ status: 200, description: 'Todo retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Todo not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const data = await this.todoService.findOne(id, req.user);
        return {
            message: 'Todo retrieved successfully',
            data,
        };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a todo' })
    @ApiResponse({ status: 200, description: 'Todo updated successfully' })
    @ApiResponse({ status: 404, description: 'Todo not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto,
        @Request() req,
    ) {
        const data = await this.todoService.update(id, updateTodoDto, req.user);
        return {
            message: 'Todo updated successfully',
            data,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a todo' })
    @ApiResponse({ status: 204, description: 'Todo deleted successfully' })
    @ApiResponse({ status: 404, description: 'Todo not found' })
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        await this.todoService.remove(id, req.user);
    }
}