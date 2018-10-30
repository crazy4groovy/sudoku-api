const flatten = require('lodash.flatten')

const execTimes = (num, thunk) => {
  for (let i = 0; i < num; i++) thunk(i)
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

/**
  Returns the board in array that represent its vertical columns
*/
// eslint-disable-next-line no-unused-vars
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
  Returns the board in array that represent its 9x9 squares
*/
// eslint-disable-next-line no-unused-vars
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

const swapRowNums = (row = [], a = 1, b = 2) => {
  row = row.join('')
  row = row.replace(new RegExp(a), '_')
  row = row.replace(new RegExp(b), a)
  row = row.replace(/_/, b)
  row = row.split('').map(c => Number(c))
  return row
}

/**
  Changes a valid/solved board to contain a given number (newNum) at an index (idx)
  Note: Board is still valid/solved
*/
const changeBoard = (idx = 0, newNum = 1, board = []) => {
  if (idx < 0 || idx > 80) throw new Error(`idx ${idx} is invalid`)
  if (newNum < 1 || newNum > 9) throw new Error(`newNum ${newNum} is invalid`)
  if (!Array.isArray(board) || board.length !== 81)
    throw new Error(`board ${JSON.stringify(board)} is invalid`)

  const oldNum = board[idx]

  if (oldNum === newNum) return board

  const boardRows = chunkifyAsRows(board)
  const newBoardRows = boardRows.map(row => swapRowNums(row, oldNum, newNum))
  const newBoard = flatten(newBoardRows)
  return newBoard
}

module.exports.changeBoard = changeBoard
module.exports.chunkify = chunkifyAsRows
module.exports.execTimes = execTimes
