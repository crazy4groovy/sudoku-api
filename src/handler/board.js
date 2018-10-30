/*
  This is a easy, "standard" solved board, built via a simple pattern
*/
module.exports = () =>
  '123456789456789123789123456234567891567891234891234567345678912678912345912345678'
    .split('')
    .map(n => Number(n))
