import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module.js';
import { ErroresPrismaFilter } from './common/filters/errores-prisma.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErroresPrismaFilter(httpAdapter));
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
