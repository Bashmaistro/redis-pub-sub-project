import { User } from "src/auth/entities/auth.entity";
export declare class CreateEventDto {
    publisher: User;
    name: string;
    description: string;
    Date: string;
    participants?: User[];
}
