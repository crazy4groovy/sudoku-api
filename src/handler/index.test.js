const {get} = require('.')

describe('HANDLER::', () => {
  it('should get a solved board', () => {
    const result = get({query: {}})
    expect(result).toHaveLength(81)
  })

  it('should get a solved board with specified index/number', () => {
    let result = get({query: {idx: 0, num: 9}})
    expect(result).toHaveLength(81)
    expect(result[0]).toBe(9)

    result = get({query: {idx: 1, num: 2}})
    expect(result).toHaveLength(81)
    expect(result[1]).toBe(2)
  })
})
