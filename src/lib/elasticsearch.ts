import { Module, OnModuleInit, Scope } from "@nestjs/common";
import { ElasticsearchModule, ElasticsearchService } from "@nestjs/elasticsearch";
import { REQUEST } from "@nestjs/core";
import * as fs from 'fs'
import { Searchservice } from "./search.service";

const ca = fs.readFileSync('./ca.crt')

const searchServiceProvider = {
  provide: 'SEARCH_SERVICE',
  useFactory: (esService: ElasticsearchService) => {
    return new Searchservice(esService.child({}))
  },
  inject: [ElasticsearchService],
  scope: Scope.REQUEST
}

@Module({
  imports: [ElasticsearchModule.registerAsync({
    useFactory: () => {
      return {
        node: 'https://es01:9200',
        auth: {
          apiKey: process.env.API_KEY as string,
        },
        tls: {
          ca: ca
        },
      }
    },
  })],
  providers: [searchServiceProvider],
  exports: ['SEARCH_SERVICE'],
})
export class SearchModule implements OnModuleInit {
// export class SearchModule {
  constructor(
    private readonly searchService: ElasticsearchService,
  ) { }
  onModuleInit() {
    this.searchService.diagnostic.on('request', (err, reuslt) => {
      // console.warn(err, reuslt)
    })
    console.warn("The module has been initialized.")
  }
}
