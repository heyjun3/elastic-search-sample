import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
import { ConfigModule } from '@nestjs/config'
import config from 'config'
import { Request, Response, NextFunction } from 'express'

@Module({
  imports: [CatsModule, ConfigModule.forRoot({load: [config]})],
  exports: [ConfigModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply((req: Request, _res: Response, next: NextFunction) => {
      const contentType = req.headers['content-type']
      if (contentType && !(contentType === 'application/octet-stream') && req.body) {
        console.warn('not parse manual')
        next()
      }
      const buf: Buffer[] = []
      req.on('data', (chunk: Buffer) => {
        buf.push(chunk)
      })
      req.on('end', () => {
        req.body = JSON.parse(Buffer.concat(buf).toString())
        next()
      })
    }).forRoutes('cats')
  }
}
