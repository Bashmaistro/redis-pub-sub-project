import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {

  }
  


    //Creating event with publisher user id
    @Post('create')
    @UseGuards(JwtAuthGuard)
    createEvent(@Body() createEventDto: CreateEventDto , @Req() req:any){

      return this.eventService.createEvent(req.user.username, createEventDto);


    }




    //Joining an event (There is ready service in auth service)

    @Post('join')
    @UseGuards(JwtAuthGuard)
    joinEvent(@Body('eventName') eventName : string,@Body('pubName') pubName:string , @Req() req:any){

      return this.eventService.joinEvent(req.user.username , eventName,pubName);

    }



    //Quiting an event (There is ready service in auth service)

    @Post('leave')
    @UseGuards(JwtAuthGuard)
    leaveEvent(@Body('eventName') eventName : string,@Body('pubName') pubName:string , @Req() req:any){

      return this.eventService.leaveEvent(req.user.username , eventName,pubName);
    }

    




    @Post('subscribe')
    @UseGuards(JwtAuthGuard)
    subscribe(@Body('publisher') publisher:string){
      return this.eventService.subscribe(publisher);
    }







  }

