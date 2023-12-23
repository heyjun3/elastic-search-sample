import { Client } from '@elastic/elasticsearch'
import * as fs from 'fs'

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

test("register document", async () => {
  const res = await client.index({
    index: 'search-test',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming',
    }
  })
  expect(res.result).toEqual('created')
})
