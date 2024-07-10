"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const redis_service_1 = require("./redis/redis.service");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const socket_io_1 = require("socket.io");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:8080',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    const redisService = app.get(redis_service_1.RedisService);
    const pubClient = redisService.getPublisher();
    const subClient = redisService.getSubscriber();
    if (pubClient.status !== 'ready') {
        await pubClient.connect();
    }
    if (subClient.status !== 'ready') {
        await subClient.connect();
    }
    const io = new socket_io_1.Server(app.getHttpServer(), {
        adapter: (0, redis_adapter_1.createAdapter)(pubClient, subClient),
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('subscribe', (channel) => {
            console.log(`Subscribing to channel: ${channel}`);
            socket.join(channel);
        });
        subClient.on('message', (channel, message) => {
            console.log(`Received message on channel ${channel}:`, message);
            io.to(channel).emit(channel, message);
        });
    });
    io.listen(3001);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map