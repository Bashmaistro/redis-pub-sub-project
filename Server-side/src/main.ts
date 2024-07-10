import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisService } from './redis/redis.service';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:8080', // Bu, Vue.js uygulamanızın kök URL'si olmalı
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Credentials (örneğin cookie) kullanılıyorsa true yapılmalı
        allowedHeaders: 'Content-Type, Accept, Authorization',
      });

    // RedisService initialization
    const redisService = app.get(RedisService);
    const pubClient = redisService.getPublisher();
    const subClient = redisService.getSubscriber();

    // Connect Redis clients if not already connected
    if (pubClient.status !== 'ready') {
        await pubClient.connect();
    }
    if (subClient.status !== 'ready') {
        await subClient.connect();
    }

    const io = new Server(app.getHttpServer(), {
        adapter: createAdapter(pubClient, subClient),
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
            io.to(channel).emit(channel, message); // Soket odasına mesajı iletiyoruz
        });
    });

    io.listen(3001);
    await app.listen(3000);
}

bootstrap();