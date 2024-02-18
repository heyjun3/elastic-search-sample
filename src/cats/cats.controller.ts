import { Req, Body, Controller, Get, Post, Headers, RawBodyRequest}  from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { CatsService } from './cats.service'
import { Request } from 'express'

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

  @Post()
  async update(@Body() body: any, @Headers() header: any, @Req() req: RawBodyRequest<Request>): Promise<any> {
    console.warn('body', body)
    return body
  }
}