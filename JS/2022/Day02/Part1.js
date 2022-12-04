import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const rounds = input.split('\r\n')

const pointValues = { X: 1, Y: 2, Z: 3 }
const relations = { A: 'X', B: 'Y', C: 'Z' }

let myPointTotal = 0

for (const round of rounds) {
  const moves = round.split(' ')
  const elfMove = relations[moves[0].trim()]
  const myMove = moves[1].trim()
  const elfMoveScore = pointValues[elfMove]
  const myMoveScore = pointValues[myMove]
  const v = myMoveScore + (elfMoveScore + 1 === myMoveScore || (elfMoveScore + 1 === 4 && myMoveScore === 1) ? 6 : (elfMoveScore === myMoveScore ? 3 : 0))
  myPointTotal += v
  console.log(`Matchup: ${elfMove} ${myMove} | New Total ${myPointTotal} | Added: ${v}`)
}

console.log(myPointTotal)