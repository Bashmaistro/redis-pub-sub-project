import { AuthService } from "../auth.service";
declare const LocalStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class LocalStrategy extends LocalStrategy_base {
    private authServicer;
    constructor(authServicer: AuthService);
    validate(username: string, password: string): Promise<string | (import("mongoose").Document<unknown, {}, import("../entities/auth.entity").User> & import("../entities/auth.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    })>;
}
export {};
