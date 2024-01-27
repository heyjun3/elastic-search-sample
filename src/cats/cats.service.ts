import { Inject, Injectable } from "@nestjs/common";
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
    // const res = await this.searchService.search<{name: string}>({
    const res = await this.searchService.count({
      index: 'search-test',
      query: {
        // range: {
        //   age: {
        //     gte: 0,
        //   }
        // }
        match_all: {}
      }
    }, {})
    console.warn(res)
    return this.cats
  }
}
