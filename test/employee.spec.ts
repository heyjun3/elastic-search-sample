import { Client } from "@elastic/elasticsearch"
import { elasticsearchClientFactory, seeder } from "./util"

import { Employee } from '../src/employee'

const dataset: Array<Employee> = [{
  name: '岡本太郎',
  nameKana: 'オカモトタロウ'
}]

describe('test employee', () => {
  let client: Client
  const index = 'employee-test'

  beforeAll(async () => {
    client = elasticsearchClientFactory()
    await client.indices.delete({
      index
    }, { ignore: [400, 404] })
    await client.indices.create({
      index
    })
    await seeder(client, index, dataset)
    await (() => new Promise((resolve) => setTimeout(resolve, 1000)))()
    client.diagnostic.on('request', (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.info(result?.meta.request.params)
      }
    })
  })

  test('full match', async () => {
    const res = await client.search<Employee>({
      index,
      query: {
        match: {
          name: '岡本太郎'
        }
      }
    })
    expect(res.hits.hits.length).toBeGreaterThan(0)
  })
})