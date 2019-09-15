const {chunkifyAsRows, changeBoardNum, swap} = require('./utils')
const board = require('./board')

describe('UTILS::', () => {
  it('should swap nums', () => {
    const data = [1, 2, 3, 2, 1]
    const expected = [2, 1, 3, 1, 2]
    const result = swap(data, 1, 2)
    expect(result).toEqual(expected)
  })

  it('should chunkify array', () => {
    // prettier-ignore
    const data = [0,0,0,2,0,0,0,0,0,0,0,3,0,0,0,0,7,0,0,0,0,1,0,9,0,0,0,0,1,0,0,7,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,7,0,0,0,0,0,0,0,3,1,0,0,0,0,9,6,0,0,0,0,9,3,7,4,1,0,4,5,7,1,0,3,8,0]

    const expected = [
      [0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 7, 0],
      [0, 0, 0, 1, 0, 9, 0, 0, 0],
      [0, 1, 0, 0, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 4, 0, 0],
      [0, 0, 7, 0, 0, 0, 0, 0, 0],
      [0, 3, 1, 0, 0, 0, 0, 9, 6],
      [0, 0, 0, 0, 9, 3, 7, 4, 1],
      [0, 4, 5, 7, 1, 0, 3, 8, 0]
    ]

    expect(chunkifyAsRows(data)).toEqual(expected)
  })

  it('should changeBoard if needed', () => {
    let data = board()
    let expectedData
    let result

    // simple case, no change to board
    expectedData = data
    result = changeBoardNum(0, 1, data)
    expect(result).toEqual(expectedData)

    // change case, update board to a new number @ index
    // console.log(JSON.stringify(changeBoard(0, 2, data)))
    data = board()
    // prettier-ignore
    expectedData = [2,1,3,4,5,6,7,8,9,4,5,6,7,8,9,2,1,3,7,8,9,2,1,3,4,5,6,1,3,4,5,6,7,8,9,2,5,6,7,8,9,2,1,3,4,8,9,2,1,3,4,5,6,7,3,4,5,6,7,8,9,2,1,6,7,8,9,2,1,3,4,5,9,2,1,3,4,5,6,7,8]
    result = changeBoardNum(0, 2, data)
    expect(result).not.toEqual(data)
    expect(result).toEqual(expectedData)
  })
})
