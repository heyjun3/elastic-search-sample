import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EventEmitter } from 'stream'

async function bootstrap() {
    // EventEmitter.setMaxListeners(100)
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}
bootstrap()
