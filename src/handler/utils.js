const flatten = require('lodash.flatten')

const execTimes = (num, thunk) => {
  for (let i = 0; i < num; i++) thunk(i)
}

/**
  Returns the board in array that represent its vertical columns
*/
const chunkifyAsColumns = (board = []) => {
  // [i=0] => 0, 9, 18, 27, 36, ..., 81
  // [i=1] => 1, 10, 19, .. 82
  const columns = []
  for (let i = 0; i <= 9 - 1; i++) {
    for (let j = 0; j <= 9 - 1; j++) {
      if (j === 0) columns.push([])
      const k = (j * 9 + i) % (9 * 9)
      columns[columns.length - 1].push(board[k])
    }
  }
  return columns
}

/**
  Returns the board in array that represent its horizontal rows
*/
const chunkifyAsRows = (board = []) =>
  board.reduce((coll, item, i) => {
    if (i % 9 === 0) {
      coll.push([])
    }
    coll[coll.length - 1].push(item)
    return coll
  }, [])

const groupChunksReducer = (coll, chunk, i) => {
  if (i % 3 === 0) {
    coll.push([])
  }
  coll[coll.length - 1].push(chunk)
  return coll
}

/**
  Returns the board in array that represent its vertical columns in groups of 3
*/
const chunkifyAsGroupColumns = (board = []) => {
  const columnChunks = chunkifyAsColumns(board)
  const groups = columnChunks.reduce(groupChunksReducer, [])
  return groups
}

/**
  Returns the board in array that represent its horizontal rows in groups of 3
*/
const chunkifyAsGroupRows = (board = []) => {
  const rowChunks = chunkifyAsRows(board)
  const groups = rowChunks.reduce(groupChunksReducer, [])
  return groups
}

/**
  Returns the board in array that represent its 9x9 squares
*/
const chunkifyAsSquares = (board = []) => {
  //   // [i=0] 0,1,2,     9,10,11,  18,19,20
  //   // [i=1] 3,4,5,    12,13,14,  21,22,23
  //   // [i=2] 6,7,8,    15,16,17,  24,25,26
  //   // [i=3] 27,28,29, 36,37,38,  45,46,47
  //   // Note: should probably use chunkifyAsRows data to help
  //   // eg.
  const rows = chunkifyAsRows(board)
  const squares = []
  for (let i = 0; i <= 9 - 1; i++) {
    squares[i] = []

    for (let j = 0; j <= 9 - 1; j++) {
      const r = Math.floor(j / 3) + Math.floor(i / 3) * 3
      const c = (j % 3) + (i % 3) * 3
      squares[squares.length - 1].push(rows[r][c])
    }
  }
  return squares
}

/**
  Swaps numbers a <==> b in an array
*/
const swap = (nums = [], a, b) => {
  nums = nums.slice(0) // clone

  nums.forEach((n, i) => {
    if (n === a) {
      nums[i] = '_'
    }
  })
  // todo: can this go in loop above?
  nums.forEach((n, i) => {
    if (n === b) {
      nums[i] = a
    }
  })
  nums.forEach((n, i) => {
    if (n === '_') {
      nums[i] = b
    }
  })

  return nums
}

/**
  Changes a valid/solved board to contain a given number (setToNum) at an index (idx)
  Note: Board is still valid/solved
*/
const changeBoardNum = (idx, setToNum, board = []) => {
  if (idx < 0 || idx > 80) throw new Error(`board idx ${idx} is invalid`)
  if (setToNum < 1 || setToNum > 9)
    throw new Error(`board newNum ${setToNum} is invalid`)
  if (!Array.isArray(board) || board.length !== 81)
    throw new Error(`board ${JSON.stringify(board)} is invalid`)

  const oldNum = board[idx]

  if (oldNum === setToNum) return board

  return swap(board, oldNum, setToNum)
}

const changeBoardCols = (col1Idx, col2Idx, board = []) => {
  if (col1Idx < 0 || col1Idx > 8 || col2Idx < 0 || col2Idx > 8)
    throw new Error('invalid column index')

  if (Math.ceil((col1Idx + 1) / 3) !== Math.ceil((col2Idx + 1) / 3))
    throw new Error('columns must be in same group')

  if (col1Idx === col2Idx) return board

  const cols = chunkifyAsColumns(board)

  const col1 = cols[col1Idx]
  const col2 = cols[col2Idx]
  cols[col1Idx] = col2
  cols[col2Idx] = col1

  return flatten(chunkifyAsColumns(flatten(cols)))
}

const changeBoardRows = (row1Idx, row2Idx, board = []) => {
  if (row1Idx < 0 || row1Idx > 8 || row2Idx < 0 || row2Idx > 8)
    throw new Error('invalid row index')

  if (Math.ceil((row1Idx + 1) / 3) !== Math.ceil((row2Idx + 1) / 3))
    throw new Error('rows must be in same group')

  if (row1Idx === row2Idx) return board

  const rows = chunkifyAsRows(board)

  const row1 = rows[row1Idx]
  const row2 = rows[row2Idx]
  rows[row1Idx] = row2
  rows[row2Idx] = row1

  return flatten(rows)
}

const changeBoardGroupCols = (col1Idx, col2Idx, board = []) => {
  if (col1Idx < 0 || col1Idx > 2 || col2Idx < 0 || col2Idx > 2)
    throw new Error('invalid column group index')

  if (col1Idx === col2Idx) return board

  col1Idx *= 3
  col2Idx *= 3
  for (let i = 0; i < 2; i++) {
    board = changeBoardCols(col1Idx + i, col2Idx + i, board)
  }

  return board
}

const changeBoardGroupRows = (row1Idx, row2Idx, board = []) => {
  if (row1Idx < 0 || row1Idx > 2 || row2Idx < 0 || row2Idx > 2)
    throw new Error('invalid row group index')

  if (row1Idx === row2Idx) return board

  row1Idx *= 3
  row2Idx *= 3
  for (let i = 0; i < 2; i++) {
    board = changeBoardRows(row1Idx + i, row2Idx + i, board)
  }

  return board
}

module.exports.changeBoardNum = changeBoardNum
module.exports.changeBoardCols = changeBoardCols
module.exports.changeBoardRows = changeBoardRows
module.exports.changeBoardGroupCols = changeBoardGroupCols // TODO: test
module.exports.changeBoardGroupRows = changeBoardGroupRows // TODO: test

module.exports.chunkifyAsColumns = chunkifyAsColumns
module.exports.chunkifyAsRows = chunkifyAsRows
module.exports.chunkifyAsGroupColumns = chunkifyAsGroupColumns // TODO: test
module.exports.chunkifyAsGroupRows = chunkifyAsGroupRows // TODO: test
module.exports.chunkifyAsSquares = chunkifyAsSquares // TODO: test

module.exports.execTimes = execTimes // TODO: test
module.exports.swap = swap
