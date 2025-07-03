import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TodoModule} from "./todo/todo.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [TodoModule, AuthModule, UsersModule, ConfigModule.forRoot({
    envFilePath: [
        '.env.dev',
        '.env'
    ],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
