import { Injectable } from '@nestjs/common';

import Redis, { Redis as RedisClient } from 'ioredis';


@Injectable()
export class RedisService {


    private publisher: RedisClient;
    private subscriber: RedisClient;

    constructor() {
        this.publisher = new Redis(); // Varsayılan Redis bağlantısı, localhost:6379
        this.subscriber = this.publisher.duplicate(); // Subscriber, publisher'a bağlı olarak oluşturulur
    }


    async publish(channel:string , message: string){
        console.log("publishte");
        
        await this.publisher.publish(channel, JSON.stringify(message));
    }

    async subscribe(channel: string, callback: (message: any) => void) {
        console.log("substa");
        await this.subscriber.subscribe(channel);
        this.subscriber.on('message', (chan, msg) => {
          if (chan === channel) {
            callback(JSON.parse(msg));
          }
        });}



    setPublisher( pubClient : any)    {
        this.publisher = pubClient;
    }
    setSubscriber( subClient : any)    {
        this.subscribe = subClient;
    }

    getPublisher(): RedisClient{
        return this.publisher;

    } 
    
    getSubscriber() : RedisClient
    {
        return this.subscriber;
    }

}
