import { Global, Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import * as fs from 'fs'

const ca = fs.readFileSync('./ca.crt')

@Global()
@Module({
  imports: [ElasticsearchModule.register({
    node: 'https://es01:9200',
    auth: {
      apiKey: process.env.API_KEY as string,
    },
    tls: {
      ca: ca
    }
  })],
})
export class SearchModule { }
