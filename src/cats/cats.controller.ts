import { Controller, Get } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly catsService: CatsService,
  ) {}
  @Get()
  async findAll(): Promise<string> {
    const res = await this.elasticsearchService.search({
      query: {
        match_all: {}
      }
    })
    console.warn(res.hits.hits)
    return 'This action returns all cats'
  }
}