import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { hostname } from "os";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Desafio MKS Documentation')
  .setDescription('API de catalogo de filmes com JWT')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, '0.0.0.0')
}
bootstrap();
