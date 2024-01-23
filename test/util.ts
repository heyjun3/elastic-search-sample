import { Client } from '@elastic/elasticsearch'
import * as fs from 'fs'

export const elasticsearchClientFactory = () => {
  const ca = fs.readFileSync('./ca.crt')

  const client = new Client({
    node: "https://es01:9200",
    auth: {
      apiKey: process.env.API_KEY as string,
    },
    tls: {
      ca: ca,
    }
  })
  return client
}

export const seeder = async <T>(client: Client, index: string, dataset:Array<T>) => {
  const operations = dataset.flatMap((doc) => [{index: { _index: index}}, doc])
  const res = await client.bulk({ operations})
  if (res.errors) {
    console.warn(res.items)
    for (const item of res.items) {
      console.warn(item)
    }
  }
}
