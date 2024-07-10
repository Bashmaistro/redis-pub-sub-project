import { IsString, isString } from "class-validator";
import { User } from "src/auth/entities/auth.entity";

export class CreateEventDto{


    publisher:User;

    name:string;


    description:string;

    Date:string;

    participants?: User[];


}