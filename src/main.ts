import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('app.port');

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )
        .setGlobalPrefix('api')
        .enableCors();

    await app.listen(port);
}
bootstrap();