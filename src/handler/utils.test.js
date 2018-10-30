const {chunkify, changeBoard} = require('./utils')
const board = require('./board')

describe('UTILS::', () => {
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

    expect(chunkify(data)).toEqual(expected)
  })

  it('should changeBoard of needed', () => {
    const data = board()
    let expectedData

    // simple case, no change to board
    expect(data[0]).toBe(1)
    expectedData = data
    expect(changeBoard(0, 1, data)).toEqual(data)

    // change case, update board to a new number @ index
    // console.log(JSON.stringify(changeBoard(0, 2, data)))
    // prettier-ignore
    expectedData = [2,1,3,4,5,6,7,8,9,4,5,6,7,8,9,2,1,3,7,8,9,2,1,3,4,5,6,1,3,4,5,6,7,8,9,2,5,6,7,8,9,2,1,3,4,8,9,2,1,3,4,5,6,7,3,4,5,6,7,8,9,2,1,6,7,8,9,2,1,3,4,5,9,2,1,3,4,5,6,7,8]
    expect(changeBoard(0, 2, data)).not.toEqual(data)
    expect(changeBoard(0, 2, data)).toEqual(expectedData)
  })
})
