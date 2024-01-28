import { test } from '@jest/globals'
import fc from 'fast-check'
import { parseArgs } from 'util'
import { Z_FIXED } from 'zlib'

type FizzBuzz = 'FizzBuzz' | 'Fizz' | 'Buzz' | number

export const fizzbuzz = (num: number): FizzBuzz => {
  if (num % 3 === 0 && num % 5 === 0) {
    return 'FizzBuzz'
  }
  if (num % 3 === 0) {
    return 'Fizz'
  }
  if (num % 5 === 0) {
    return 'Buzz'
  }
  return num
}

describe('parameterized test', () => {
  const table = [
    { name: 'fizz', num: 3, expected: 'Fizz' },
    { name: 'buzz', num: 5, expected: 'Buzz' },
    { name: 'fizzbuzz', num: 15, expected: 'FizzBuzz' },
  ]

  // describe.each(table)('$name test', ({num, expected}) => {
  //   test('fizzbuzz', () => {
  //     expect(fizzbuzz(num)).toEqual(expected)
  //   })
  // })

  test.each(table)('$name test', ({ num, expected }) => {
    expect(fizzbuzz(num)).toEqual(expected)
  })
})

describe('property based testing', () => {
  test('fizzbuzz', () => {
    fc.assert(
      fc.property(fc.nat(), (num) => {
        fc.pre(num % 3 === 0)
        fc.pre(num % 5 === 0)
        expect(fizzbuzz(num)).toEqual('FizzBuzz')
      })
    )
  })

  test('fizz', () => {
    fc.assert(
      fc.property(fc.nat(), (num) => {
        fc.pre(num % 3 === 0)
        fc.pre(num % 5 !== 0)
        expect(fizzbuzz(num)).toEqual('Fizz')
      })
    )
  })

  test('buzz', () => {
    fc.assert(
      fc.property(fc.nat(), (num) => {
        fc.pre(num % 3 !== 0)
        fc.pre(num % 5 === 0)
        expect(fizzbuzz(num)).toEqual('Buzz')
      })
    )
  })

  test('others', () => {
    fc.assert(
      fc.property(fc.nat(), (num) => {
        fc.pre(num % 3 !== 0)
        fc.pre(num % 5 !== 0)
        expect(fizzbuzz(num)).toEqual(num)
      })
    )
  })
})
