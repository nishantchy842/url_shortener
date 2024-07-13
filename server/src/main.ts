import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useSwagger } from './config/swagger.config';
import { ApiResponseInterceptor } from './common/interceptors/apiResponse.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  const port = config.get('PORT');

  useSwagger(app);

  await app.listen(port);
}
bootstrap();
