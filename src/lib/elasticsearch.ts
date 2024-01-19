import { Global, Module, Scope } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModule, ElasticsearchService } from "@nestjs/elasticsearch";
import * as fs from 'fs'
import { Searchservice } from "./search.service";

const ca = fs.readFileSync('./ca.crt')

const searchServiceProvider = {
  provide: 'SEARCH_SERVICE',
  useFactory: (esService: ElasticsearchService) => {
    console.warn('create child client')
    return new Searchservice(esService.child({}))
  },
  inject: [ElasticsearchService],
  scope: Scope.REQUEST
}

@Module({
  imports: [ElasticsearchModule.registerAsync({
    useFactory: () => {
      console.warn('test')
      return {node: 'https://es01:9200',
      auth: {
        apiKey: process.env.API_KEY as string,
      },
      tls: {
        ca: ca
      }
    }},
  })],
  providers: [searchServiceProvider],
  exports: ['SEARCH_SERVICE'],
})
export class SearchModule { }
