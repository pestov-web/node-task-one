import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3012);
  console.log(`User service running on port ${process.env.PORT || '3012'}`);
}
bootstrap();
