import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthService } from 'src/auth/auth.service';
import { Event } from './entities/event.entity';
export declare class EventService {
    private eventModel;
    private readonly redisService;
    private readonly authService;
    constructor(eventModel: Model<Event>, redisService: RedisService, authService: AuthService);
    createEvent(uname: string, createEventDto: CreateEventDto): Promise<import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    joinEvent(username: string, eventName: string, eventPublsiherName: string): Promise<import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    leaveEvent(username: string, eventName: string, eventPublsiherName: string): Promise<import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    subscribe(pubUsername: string): Promise<unknown>;
}
