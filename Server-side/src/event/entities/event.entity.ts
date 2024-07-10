import { Schema , Prop , SchemaFactory} from "@nestjs/mongoose";

import { Document, Types } from 'mongoose';
import { User } from "src/auth/entities/auth.entity";


@Schema()
export class Event {
    


    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required:false })
    publisher: User;

    @Prop({ unique: false, required:true })
    name: string;
    
    @Prop({ unique: false, required:true })
    description: string;

    @Prop({ unique: false, required:true })
    Date: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required:false })
    participants?: User[];

    



}

export const EventSchema = SchemaFactory.createForClass(Event);