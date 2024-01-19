import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { SearchModule } from 'lib/elasticsearch'
import { CatsService } from './cats.service'
import { Searchservice } from 'lib/search.service'

@Module({
  imports: [SearchModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule { }