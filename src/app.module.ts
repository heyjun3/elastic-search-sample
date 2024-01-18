import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
import { SearchModule } from 'lib/elasticsearch'

@Module({
  imports: [CatsModule, SearchModule],
})
export class AppModule { }
