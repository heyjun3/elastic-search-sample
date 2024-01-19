import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import * as fs from 'fs'

const ca = fs.readFileSync('./ca.crt')

@Module({
  imports: [ElasticsearchModule.registerAsync({
    useFactory: () => ({
      node: 'https://es01:9200',
      auth: {
        apiKey: process.env.API_KEY as string,
      },
      tls: {
        ca: ca
      }
    }),
  })],
  exports: [ElasticsearchModule]
})
export class SearchModule { }
