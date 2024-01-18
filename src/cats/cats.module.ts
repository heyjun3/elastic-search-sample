import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { SearchModule } from 'lib/elasticsearch'

@Module({
  imports: [SearchModule],
  controllers: [CatsController],
})
export class CatsModule { }