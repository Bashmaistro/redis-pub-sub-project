declare const JwtStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(authPayload: any): any;
}
export {};
