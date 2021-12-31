import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //this will allow as to pass the cors policy
  // app.enableCors();
  //this is application level validation pipe
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); //this will set a global prefix to our api
  //this is fot the swagger documentation
  const options = new DocumentBuilder()
    .setTitle('Etnet-Movie-Streaming-Service')
    .setDescription(
      'Etnet-Movie-Streaming-Service',
    )
    .setVersion('1.0.0')
    .build();
  //this will give the swagger module the path, api, and document
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(9000 || process.env.PORT);
  console.log(`Server is Running on ${ await app.getUrl()}`);
}
bootstrap();