import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { RedisModule } from './redis/redis.module';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, RedisModule, EventModule,MongooseModule.forRoot('mongodb://localhost:27017/redis'),],
  controllers: [AppController,AuthController],
  providers: [AppService],
})
export class AppModule {}
