const {get, post} = require('.')

describe('HANDLER::', () => {
  it('should get a new board via GET', async () => {
    // not much to test here, other than the array length
    expect(await get({query: {}})).toHaveLength(81)
    expect(await get({query: {difficulty: 'easy'}})).toHaveLength(81)
    expect(await get({query: {difficulty: 'medium'}})).toHaveLength(81)
    expect(await get({query: {difficulty: 'hard'}})).toHaveLength(81)
  })

  it('should not solve a new board via GET when specified', async () => {
    const solved = await get({query: {}}) // default = true
    expect(solved.filter(num => num === 0).length).toBe(0)

    const solved2 = await get({query: {solve: 'true'}})
    expect(solved2.filter(num => num === 0).length).toBe(0)

    const unsolved = await get({query: {solve: 'false'}})
    expect(unsolved.filter(num => num === 0).length).toBeGreaterThan(0)
  })

  it('should solve a board via POST', async () => {
    // prettier-ignore
    const data = [0,0,0,2,0,0,0,0,0,0,0,3,0,0,0,0,7,0,0,0,0,1,0,9,0,0,0,0,1,0,0,7,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,7,0,0,0,0,0,0,0,3,1,0,0,0,0,9,6,0,0,0,0,9,3,7,4,1,0,4,5,7,1,0,3,8,0]

    // prettier-ignore
    const expected = [1, 5, 4, 2, 3, 7, 8, 6, 9, 2, 9, 3, 4, 6, 8, 1, 7, 5, 6, 7, 8, 1, 5, 9, 2, 3, 4, 3, 1, 2, 6, 7, 4, 9, 5, 8, 5, 6, 9, 3, 8, 1, 4, 2, 7, 4, 8, 7, 9, 2, 5, 6, 1, 3, 7, 3, 1, 8, 4, 2, 5, 9, 6, 8, 2, 6, 5, 9, 3, 7, 4, 1, 9, 4, 5, 7, 1, 6, 3, 8, 2]

    const result = await post({body: data})
    expect(result).toEqual(expected)
  })
})
