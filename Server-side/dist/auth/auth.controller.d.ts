import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateUserDto): Promise<{
        token: string | (import("mongoose").Document<unknown, {}, import("./entities/auth.entity").User> & import("./entities/auth.entity").User & {
            _id: import("mongoose").Types.ObjectId;
        });
        username: string;
        email: string;
        password: string;
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(authDto: AuthDto): Promise<string | (import("mongoose").Document<unknown, {}, import("./entities/auth.entity").User> & import("./entities/auth.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    })>;
}
