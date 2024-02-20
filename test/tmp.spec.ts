
let n = 0
jest.retryTimes(11)
describe("retry test", () => {
    test('failed test', () => {
        expect(n++).toBeGreaterThan(10)
    })
})
