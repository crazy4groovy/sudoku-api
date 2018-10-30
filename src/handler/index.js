const rand = require('lodash.random')
const getBoard = require('./board')
const {changeBoard, execTimes} = require('./utils')

function get({query}) {
  let board = getBoard()

  function shuffleBoard() {
    board = changeBoard(rand(0, 80), rand(1, 9), board)
  }
  const times = rand(10, 100)
  // console.log('Shuffle times:', times)
  execTimes(times, shuffleBoard)

  if (!query.num) return board

  const idx = Number(query.idx)
  const num = Number(query.num)
  board = changeBoard(idx, num, board)
  return board
}

module.exports.get = get
