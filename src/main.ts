import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import express from 'express'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
    // EventEmitter.setMaxListeners(100)
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {rawBody: true})
    await app.listen(3000)
}
bootstrap()
