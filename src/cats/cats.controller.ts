import { Controller, Get } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Controller('cats')
export class CatsController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
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