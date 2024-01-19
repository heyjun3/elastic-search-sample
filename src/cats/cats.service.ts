import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export class CatsService {
  private readonly cats: { name: string }[] = [];
  constructor (
    private readonly searchService: ElasticsearchService,
  ){}

  create(cat: { name: string }) {
    this.cats.push(cat)
  }

  findAll(): { name: string }[] {
    console.warn(this.searchService)
    return this.cats
  }
}
