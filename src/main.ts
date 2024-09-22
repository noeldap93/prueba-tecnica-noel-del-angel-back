import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
  }));

  const config = new DocumentBuilder()
  .setTitle('Test API example')
  .setDescription('Test api made by Noel Del Angel')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('App started, listening on port: ', port);

}

bootstrap();
