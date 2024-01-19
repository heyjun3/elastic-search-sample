import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
import { ConfigModule } from '@nestjs/config'
import config from 'config'

@Module({
  imports: [CatsModule, ConfigModule.forRoot({load: [config]})],
  exports: [ConfigModule],
})
export class AppModule { }
