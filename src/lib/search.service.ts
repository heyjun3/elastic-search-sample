import { Client, TransportRequestOptions } from "@elastic/elasticsearch";
import { QueryDslQueryContainer, SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { Injectable } from "@nestjs/common";


@Injectable()
export class Searchservice {
  constructor(
    private readonly esService: Client
  ){}

  async search<T extends any>(searchRequest: SearchRequest, options?: TransportRequestOptions) {
    const query = searchRequest.query
    if (query == null) {
      throw Error('query undefined error')
    }
    const tenantQuery: QueryDslQueryContainer = {
      bool: {
        filter: [
          {
            range: {
              age: {
                gte: 0,
              }
            }
          },
          query
        ]
      }
    }
    searchRequest.query = tenantQuery

    return await this.esService.search<T>(searchRequest, options)
  }
}
