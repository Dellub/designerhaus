import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.NESTJS_API_PORT ?? 8080, () => {
    console.log('API listening on port 8080')
  })
}

bootstrap()
