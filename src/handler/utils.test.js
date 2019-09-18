const flatten = require('lodash.flatten')

const board = require('./board')
const {
  chunkifyAsColumns,
  chunkifyAsRows,
  changeBoardNum,
  changeBoardCols,
  changeBoardRows,
  changeBoardGroupCols,
  changeBoardGroupRows,
  swap,
  execTimes
} = require('./utils')

describe('UTILS::', () => {
  it('should execTimes', () => {
    let ctr = 0
    function cb() {
      ctr++
    }
    execTimes(3, cb)
    expect(ctr).toBe(3)
  })

  it('should swap nums 1<->2', () => {
    const data = [1, 2, 3, 2, 1]
    const expected = [2, 1, 3, 1, 2]
    const result = swap(data, 1, 2)
    expect(result).toEqual(expected)
  })

  it('should chunkify array as columns', () => {
    // prettier-ignore
    const data = [0,0,0,2,0,0,0,0,0,0,0,3,0,0,0,0,7,0,0,0,0,1,0,9,0,0,0,0,1,0,0,7,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,7,0,0,0,0,0,0,0,3,1,0,0,0,0,9,6,0,0,0,0,9,3,7,4,1,0,4,5,7,1,0,3,8,0]

    const expected = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 3, 0, 4],
      [0, 3, 0, 0, 0, 7, 1, 0, 5],
      [2, 0, 1, 0, 0, 0, 0, 0, 7],
      [0, 0, 0, 7, 0, 0, 0, 9, 1],
      [0, 0, 9, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 4, 0, 0, 7, 3],
      [0, 7, 0, 0, 0, 0, 9, 4, 8],
      [0, 0, 0, 0, 0, 0, 6, 1, 0]
    ]

    expect(chunkifyAsColumns(data)).toEqual(expected)
  })

  it('should chunkify array as rows', () => {
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

  it('should changeBoardNum if needed idx=0 num=2', () => {
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

  it('should changeBoardCols 0<->1', () => {
    const data = board()

    const expectedData = flatten([
      [2, 1, 3, 4, 5, 6, 7, 8, 9],
      [5, 4, 6, 7, 8, 9, 1, 2, 3],
      [8, 7, 9, 1, 2, 3, 4, 5, 6],
      [3, 2, 4, 5, 6, 7, 8, 9, 1],
      [6, 5, 7, 8, 9, 1, 2, 3, 4],
      [9, 8, 1, 2, 3, 4, 5, 6, 7],
      [4, 3, 5, 6, 7, 8, 9, 1, 2],
      [7, 6, 8, 9, 1, 2, 3, 4, 5],
      [1, 9, 2, 3, 4, 5, 6, 7, 8]
    ])
    const result = changeBoardCols(0, 1, data)

    expect(result).not.toEqual(data)
    expect(result).toEqual(expectedData)
  })

  it('should changeBoardRows 0<->1', () => {
    const data = board()

    const expectedData = flatten([
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ])
    const result = changeBoardRows(0, 1, data)

    expect(result).not.toEqual(data)
    expect(result).toEqual(expectedData)
  })

  it('should changeBoardGroupCols 0<->1', () => {
    const data = board()
    const expectedData = flatten([
      [4, 5, 6, 1, 2, 3, 7, 8, 9],
      [7, 8, 9, 4, 5, 6, 1, 2, 3],
      [1, 2, 3, 7, 8, 9, 4, 5, 6],
      [5, 6, 7, 2, 3, 4, 8, 9, 1],
      [8, 9, 1, 5, 6, 7, 2, 3, 4],
      [2, 3, 4, 8, 9, 1, 5, 6, 7],
      [6, 7, 8, 3, 4, 5, 9, 1, 2],
      [9, 1, 2, 6, 7, 8, 3, 4, 5],
      [3, 4, 5, 9, 1, 2, 6, 7, 8]
    ])

    const result = changeBoardGroupCols(0, 1, data)

    expect(result).not.toEqual(data)
    expect(result).toEqual(expectedData)
  })

  it('should changeBoardGroupRows 0<->1', () => {
    const data = board()
    const expectedData = flatten([
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ])

    const result = changeBoardGroupRows(0, 1, data)

    expect(result).not.toEqual(data)
    expect(result).toEqual(expectedData)
  })
})
