console.log(__line__)

function log(someLine = __line__) {
  console.log('the line', someLine, __line__)
}
