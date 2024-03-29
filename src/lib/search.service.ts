import { Client, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta } from "@elastic/elasticsearch";
import { QueryDslQueryContainer, SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { Injectable, OnModuleInit } from "@nestjs/common";

type Options = TransportRequestOptions | TransportRequestOptionsWithMeta | TransportRequestOptionsWithOutMeta

@Injectable()
export class Searchservice {
  constructor(
    private readonly esService: Client
  ) {
    this.esService.diagnostic.on('request', (err, result) => {
    })
  }

  async search<T extends any>(searchRequest: SearchRequest, options?: Options) {
    return await this.esService.search<T>(this.tenantQueryWrapper(searchRequest), options)
  }

  async count(searchRequest: SearchRequest, options?: Options) {
    await this.esService.indices.putAlias({index: 'search-test', name: `search-test-${Math.random() * 1000}`, filter: {}})
    return await this.esService.count(this.tenantQueryWrapper(searchRequest), options)
  }

  private tenantQueryWrapper(searchRequest: SearchRequest): SearchRequest {
    const tenantQuery = {
      bool: {
        filter: [
          {
            range: {
              age: {
                gte: Number.MAX_SAFE_INTEGER,
              }
            }
          },
        ] as QueryDslQueryContainer[]
      }
    }
    if (searchRequest.query == null) {
      searchRequest.query = tenantQuery
    } else {
      tenantQuery.bool?.filter?.push(searchRequest.query)
      searchRequest.query = tenantQuery
    }
    return searchRequest
  }
}
