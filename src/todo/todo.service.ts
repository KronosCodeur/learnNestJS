import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    private todos: Todo[] = [];
    private currentId = 1;

    create(createTodoDto: CreateTodoDto): Todo {
        const todo = new Todo({
            id: this.currentId++,
            ...createTodoDto,
            completed: createTodoDto.completed || false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        this.todos.push(todo);
        return todo;
    }

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }

    update(id: number, updateTodoDto: UpdateTodoDto): Todo {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        this.todos[todoIndex] = {
            ...this.todos[todoIndex],
            ...updateTodoDto,
            updatedAt: new Date(),
        };

        return this.todos[todoIndex];
    }

    remove(id: number): void {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        this.todos.splice(todoIndex, 1);
    }

    // Méthodes utilitaires supplémentaires
    findByStatus(completed: boolean): Todo[] {
        return this.todos.filter(todo => todo.completed === completed);
    }

    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;

        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
    }
}
