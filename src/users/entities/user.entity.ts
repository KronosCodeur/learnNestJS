import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Todo } from '../../todo/entities/todo.entity';
import {UserRole} from "./enums/user-role.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    username: string;
    @Column({ type: "enum", default: UserRole.ROLE_USER, enum: UserRole })
    role: UserRole;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}