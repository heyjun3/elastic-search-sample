import { Client } from '@elastic/elasticsearch'
import * as fs from 'fs'

import {author} from '../src/author'

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

test("range query", async () => {
  const res = await client.search<author>({
    index: 'search-test',
    query: {
      range: {
        age: {
          gte: 1,
          lte: 70,
        }
      }
    }
  })
  for (const hit of res.hits.hits) {
    expect(hit._source?.age).toBeGreaterThanOrEqual(1)
    expect(hit._source?.age).toBeLessThanOrEqual(70)
  }
})

test("sort by age", async () => {
  const res = await client.search<author>({
    index: 'search-test',
    query: {
      range: {
        age: {
          gte: 1,
          lte: 100,
        },
      },
    },
    sort: [
      {age: {order: "desc"}}
    ]
  })

  console.log(res.hits.hits)
})

test("nested query", async () => {
  const res = await client.search<author>({
    index: 'search-test',
    query: {
      nested: {
        path: "age",
        query: {
          range: {
            age: {
              gt: 1,
            }
          }
        }
      }
    }
  })

  console.log(res.hits.hits)
})
