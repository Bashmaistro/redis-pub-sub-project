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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor() {
        this.publisher = new ioredis_1.default();
        this.subscriber = this.publisher.duplicate();
    }
    async publish(channel, message) {
        console.log("publishte");
        await this.publisher.publish(channel, JSON.stringify(message));
    }
    async subscribe(channel, callback) {
        console.log("substa");
        await this.subscriber.subscribe(channel);
        this.subscriber.on('message', (chan, msg) => {
            if (chan === channel) {
                callback(JSON.parse(msg));
            }
        });
    }
    setPublisher(pubClient) {
        this.publisher = pubClient;
    }
    setSubscriber(subClient) {
        this.subscribe = subClient;
    }
    getPublisher() {
        return this.publisher;
    }
    getSubscriber() {
        return this.subscriber;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map