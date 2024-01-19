import { Controller, Get } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
  ) {}
  @Get()
  async findAll(): Promise<string> {
    await this.catsService.findAll()
    return 'This action returns all cats'
  }
}