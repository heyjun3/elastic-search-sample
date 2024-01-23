import { Client } from '@elastic/elasticsearch'

import { elasticsearchClientFactory, seeder } from './util'
import { author } from '../src/author'

const dataset = [{
  id: 1,
  character: 'Ned Stark',
  quote: 'Winter is coming',
  age: Math.floor(Math.random() * 100)
}]

describe('search test', () => {
  let client: Client
  const index = 'author-test'

  beforeAll(async () => {
    client = elasticsearchClientFactory()
    await client.indices.delete({
      index
    }, {ignore: [400, 404]})
    await client.indices.create({
      index,
      mappings: {
        properties: {
          age: { type: 'long'},
          character: {type: 'text'},
          quote: { type :'text'},
        }
      }
    })
    await seeder(client, index, dataset)
  })
  test("range query", async () => {
    const res = await client.search<author>({
      index,
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
      index,
      query: {
        range: {
          age: {
            gte: 1,
            lte: 100,
          },
        },
      },
      sort: [
        { age: { order: "desc" } }
      ]
    })
  })
})
