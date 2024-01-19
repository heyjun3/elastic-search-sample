import { Inject, Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Searchservice } from "lib/search.service";

@Injectable()
export class CatsService {
  private readonly cats: { name: string }[] = [];
  constructor(
    @Inject('SEARCH_SERVICE') private readonly searchService: Searchservice,
  ) { }

  create(cat: { name: string }) {
    this.cats.push(cat)
  }

  async findAll(): Promise<{ name: string }[]> {
    const res = await this.searchService.search<{ age: number }>({
      query: {
        range: {
          age: {
            gte: 50,
          }
        }
      }
    })
    console.warn(res.hits.hits)
    return this.cats
  }
}
