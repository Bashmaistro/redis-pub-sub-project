import { Document, Types } from 'mongoose';
import { User } from "src/auth/entities/auth.entity";
export declare class Event {
    publisher: User;
    name: string;
    description: string;
    Date: string;
    participants?: User[];
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event> & Event & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: Types.ObjectId;
}>;
