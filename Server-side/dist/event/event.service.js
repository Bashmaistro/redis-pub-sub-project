"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const redis_service_1 = require("../redis/redis.service");
const auth_service_1 = require("../auth/auth.service");
let EventService = class EventService {
    constructor(eventModel, redisService, authService) {
        this.eventModel = eventModel;
        this.redisService = redisService;
        this.authService = authService;
    }
    async createEvent(uname, createEventDto) {
        const user = await this.authService.findByUsername(uname);
        createEventDto.publisher = user;
        const createdEvent = await this.eventModel.create(createEventDto);
        const event = await createdEvent.save();
        const channelId = user.username;
        console.log(event);
        const respond = {
            name: event.name,
            description: event.description,
            Date: event.Date,
            username: event.publisher,
        };
        await this.redisService.publish(channelId, JSON.stringify(respond));
        return event;
    }
    async joinEvent(username, eventName, eventPublsiherName) {
        const user = await this.authService.findByUsername(username);
        const publisher = await this.authService.findByUsername(eventPublsiherName);
        const event = await this.eventModel.findOne({
            name: eventName,
            publisher: publisher
        });
        event.participants.push(user);
        const resultEvent = await event.save();
        await this.redisService.publish(event.publisher.username, "The user named " + user.username + "attended the event named " + eventName);
        return resultEvent;
    }
    async leaveEvent(username, eventName, eventPublsiherName) {
        const user = await this.authService.findByUsername(username);
        const publisher = this.authService.findByUsername(eventPublsiherName);
        const event = await this.eventModel.findOne({
            name: eventName,
            publisher: publisher
        });
        event.participants = event.participants.filter(fuser => fuser !== user);
        const resultEvent = await event.save();
        await this.redisService.publish(event.publisher.username, "The user named " + user.username + "leave the event named " + eventName);
        return resultEvent;
    }
    async subscribe(pubUsername) {
        return new Promise((resolve, reject) => {
            this.redisService.subscribe(pubUsername, (message) => {
                console.log(`Received message from ${pubUsername}:`, message);
                resolve(message);
            });
        });
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Event')),
    __metadata("design:paramtypes", [mongoose_1.Model, redis_service_1.RedisService, auth_service_1.AuthService])
], EventService);
//# sourceMappingURL=event.service.js.map