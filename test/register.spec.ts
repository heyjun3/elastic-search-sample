import { Client } from "@elastic/elasticsearch"
import { elasticsearchClientFactory } from "./util"

describe('register test', () => {
  let client: Client

  beforeAll(async () => {
    client = elasticsearchClientFactory()
    await client.indices.delete({
      index: 'search-test'
    })
    await client.indices.create({
      index: 'search-test'
    })
  })

  test("register document", async () => {
    const res = await client.index({
      index: 'search-test',
      document: {
        character: 'Ned Stark',
        quote: 'Winter is coming',
        age: Math.floor(Math.random() * 100)
      }
    })
    expect(res.result).toEqual('created')
  })
})
