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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const jwt_guard_1 = require("../auth/Guard/jwt.guard");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    createEvent(createEventDto, req) {
        return this.eventService.createEvent(req.user.username, createEventDto);
    }
    joinEvent(eventName, pubName, req) {
        return this.eventService.joinEvent(req.user.username, eventName, pubName);
    }
    leaveEvent(eventName, pubName, req) {
        return this.eventService.leaveEvent(req.user.username, eventName, pubName);
    }
    subscribe(publisher) {
        return this.eventService.subscribe(publisher);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Post)('join'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('eventName')),
    __param(1, (0, common_1.Body)('pubName')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.Post)('leave'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('eventName')),
    __param(1, (0, common_1.Body)('pubName')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "leaveEvent", null);
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('publisher')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "subscribe", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map