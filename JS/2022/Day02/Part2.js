import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const rounds = input.split('\r\n')

const pointValues = { X: 1, Y: 2, Z: 3 }
const relations = { A: 'X', B: 'Y', C: 'Z' }

const losingMatchups = { A: 'Z', B: 'X', C: 'Y' }
const winningMatchups = { A: 'Y', B: 'Z', C: 'X' }

let myPointTotal = 0

for (const round of rounds) {
  const elfMove = round.split(' ')[0]
  const roundEnd = round.split(' ')[1]
  const elfMoveScore = pointValues[relations[elfMove]]
  const myMove = roundEnd === 'X' ? losingMatchups[elfMove] : roundEnd === 'Z' ? winningMatchups[elfMove] : elfMove
  const myMoveScore = pointValues[myMove] || pointValues[relations[myMove]]
  const v = myMoveScore + (elfMoveScore + 1 === myMoveScore || (elfMoveScore + 1 === 4 && myMoveScore === 1) ? 6 : (elfMoveScore === myMoveScore ? 3 : 0))
  myPointTotal += v
}

console.log(myPointTotal)