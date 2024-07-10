import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { RedisModule } from 'src/redis/redis.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';

@Module({
  imports:[RedisModule,AuthModule,MongooseModule.forFeature([{
    name: Event.name,
    schema: EventSchema

}])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
