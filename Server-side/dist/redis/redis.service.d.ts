import { Redis as RedisClient } from 'ioredis';
export declare class RedisService {
    private publisher;
    private subscriber;
    constructor();
    publish(channel: string, message: string): Promise<void>;
    subscribe(channel: string, callback: (message: any) => void): Promise<void>;
    setPublisher(pubClient: any): void;
    setSubscriber(subClient: any): void;
    getPublisher(): RedisClient;
    getSubscriber(): RedisClient;
}
