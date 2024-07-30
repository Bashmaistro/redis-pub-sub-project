import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RedisService } from 'src/redis/redis.service';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from 'src/auth/entities/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { Event } from './entities/event.entity';



@Injectable()
export class EventService {

    constructor(@InjectModel('Event') private eventModel: Model<Event>,private readonly redisService: RedisService,private readonly authService:AuthService){

    }


    //Creating Event
    //It must be handling publishing event on user id channel who is creating the event(take user id from jwt service)
    async createEvent(uname: string, createEventDto: CreateEventDto){

        const user = await this.authService.findByUsername(uname);
        createEventDto.publisher = user;

        const createdEvent = await this.eventModel.create(createEventDto);
        const event = await createdEvent.save();

        const channelId = user.username

        console.log(event);

        const respond = {
            name: event.name,
            description: event.description,
            Date: event.Date,

            username: event.publisher,
        }
      
        

        await this.redisService.publish(channelId, JSON.stringify(respond))

        return event;



    }



    //Joining An Event
    //Just add event participants to a new user, we take publisher name find publisher
    // (dont forget publish message ${username} joined to the ${event} on the channel )

    async joinEvent(username: string , eventName: string , eventPublsiherName: string){

        const user = await this.authService.findByUsername(username);
        

        const publisher = await this.authService.findByUsername(eventPublsiherName)

        const event = await this.eventModel.findOne({
            name : eventName,
            publisher: publisher
        })

        event.participants.push(user);

        const resultEvent = await event.save();

        await this.redisService.publish(event.publisher.username ,"The user named " +  user.username + "attended the event named " + eventName)


        return resultEvent;

    }


    //Leaving An Event
    //Delete username from participants and same like joining evet we need publish info 
    //into the publisher channel
    async leaveEvent(username:string , eventName: string , eventPublsiherName: string){

        const user = await this.authService.findByUsername(username);

        const publisher = this.authService.findByUsername(eventPublsiherName)

        const event = await this.eventModel.findOne({
            name : eventName,
            publisher: publisher
        })

        event.participants = event.participants.filter(fuser => fuser !== user);

        const resultEvent = await event.save();

        await this.redisService.publish(event.publisher.username ,"The user named " +  user.username + "leave the event named " + eventName)


        return resultEvent;

    }



    async subscribe(pubUsername: string){

        return new Promise((resolve, reject) => {
            this.redisService.subscribe(pubUsername, (message) => {
              console.log(`Received message from ${pubUsername}:`, message);
              resolve(message); 
            });
          });
    }

    


    
}
