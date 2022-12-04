import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const elves = input.split(`\r\n\r\n`)
const scores = []

for (const elf of elves) {
  const Calories = elf.split('\n')
 
  const score = Calories.reduce( (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.trim()) )
 
  scores.push(parseInt(score))
}

scores.sort((a, b) => { return a - b })

console.log(scores[scores.length - 1] + scores[scores.length - 2] + scores[scores.length - 3])