import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiName = process.env.API_NAME;
  const apiVersion = process.env.API_VERSION;

  const config = new DocumentBuilder()
    .setTitle(apiName)
    .setDescription(`${apiName} API specification`)
    .setVersion(apiVersion)
    .addTag(apiName)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      validationError: {
        target: true,
      },
      stopAtFirstError: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
    allowedHeaders: '*',
  });

  await app.listen(PORT, () => {
    console.log('🚀 ~ awaitapp.listen ~ PORT:', PORT);
  });
}
bootstrap();
