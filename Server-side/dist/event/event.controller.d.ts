import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    createEvent(createEventDto: CreateEventDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./entities/event.entity").Event> & import("./entities/event.entity").Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    joinEvent(eventName: string, pubName: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("./entities/event.entity").Event> & import("./entities/event.entity").Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    leaveEvent(eventName: string, pubName: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("./entities/event.entity").Event> & import("./entities/event.entity").Event & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    subscribe(publisher: string): Promise<unknown>;
}
