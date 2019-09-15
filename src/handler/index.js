const rand = require('lodash.random')
const getBoard = require('./board')
const {changeBoardNum, execTimes} = require('./utils')

function get({query}) {
  let board = getBoard()

  function shuffleBoard() {
    board = changeBoardNum(rand(0, 80), rand(1, 9), board)
  }
  const times = rand(10, 100)
  // console.log('Shuffle times:', times)
  execTimes(times, shuffleBoard)

  if (query.idx === undefined) return board
  if (query.num === undefined) return board

  const idx = Number(query.idx)
  const num = Number(query.num)
  board = changeBoardNum(idx, num, board)

  return board
}

module.exports.get = get
