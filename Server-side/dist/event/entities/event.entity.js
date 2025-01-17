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
exports.EventSchema = exports.Event = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_entity_1 = require("../../auth/entities/auth.entity");
let Event = class Event {
};
exports.Event = Event;
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }], required: false }),
    __metadata("design:type", auth_entity_1.User)
], Event.prototype, "publisher", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: false, required: true }),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: false, required: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: false, required: true }),
    __metadata("design:type", String)
], Event.prototype, "Date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }], required: false }),
    __metadata("design:type", Array)
], Event.prototype, "participants", void 0);
exports.Event = Event = __decorate([
    (0, mongoose_1.Schema)()
], Event);
exports.EventSchema = mongoose_1.SchemaFactory.createForClass(Event);
//# sourceMappingURL=event.entity.js.map