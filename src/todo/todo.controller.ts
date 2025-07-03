import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createTodoDto: CreateTodoDto) {
        return {
            message: 'Todo created successfully',
            data: this.todoService.create(createTodoDto),
        };
    }

    @Get()
    findAll(@Query('status') status?: string) {
        let todos;

        if (status === 'completed') {
            todos = this.todoService.findByStatus(true);
        } else if (status === 'pending') {
            todos = this.todoService.findByStatus(false);
        } else {
            todos = this.todoService.findAll();
        }

        return {
            message: 'Todos retrieved successfully',
            data: todos,
            count: todos.length,
        };
    }

    @Get('stats')
    getStats() {
        return {
            message: 'Statistics retrieved successfully',
            data: this.todoService.getStats(),
        };
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return {
            message: 'Todo retrieved successfully',
            data: this.todoService.findOne(id),
        };
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto,
    ) {
        return {
            message: 'Todo updated successfully',
            data: this.todoService.update(id, updateTodoDto),
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.todoService.remove(id);
    }
}
