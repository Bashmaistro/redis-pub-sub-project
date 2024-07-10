import { CreateUserDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private authModel;
    private jwtService;
    constructor(authModel: Model<User>, jwtService: JwtService);
    create(createAuthDto: CreateUserDto): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findByUsername(username: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    validateUser(authPayloadDto: AuthDto): Promise<string | (import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })>;
}
