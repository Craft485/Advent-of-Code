// THIS WON'T WORK IF YOU SET YOUR IDE TO USE LF INSTEAD OF CRLF
// I DON'T UNDERSTAND WHY CARRIAGE RETURNS EXIST
import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const initialStacks = input.split(`\r\n\r\n`)[0]
console.log(initialStacks)
const rules = input.split(`\r\n\r\n`)[1].split(`\r\n`)
// console.log(rules)
const stacks = [ [], [], [], [], [], [], [], [], [] ]
const rows = initialStacks.split('\r\n')
// console.log(rows)

for (const row of rows) {
  for (let i = 0; i < row.length; i += 4) {
    const crate = row.substring(i, i + 4).trim().replaceAll(/(\[|\])/g, '')
    if (!Number(crate) && Boolean(crate)) {
      stacks[i / 4].push(crate)
    }
  }
}
// console.log(stacks[0][0])
// Stacks were generated in reverse, correcting that here
// for (const stack of stacks) {
//   stack.reverse()
// }
// console.log('\n')
// console.log(stacks[0][0])
for (const rule of rules) {
    const move = /move (\d)/.exec(rule)[1]
    const from = /from (\d)/.exec(rule)[1]
    const to = /to (\d)/.exec(rule)[1]
    // console.log('==============')
    console.log(move)
    console.log(from)
    console.log(to)
    console.log(stacks[from - 1].join(' '))
    console.log(stacks[to - 1].join(' '))
    for (let i = 0; i < move; i++) {
        stacks[to - 1].reverse().push(stacks[from - 1].shift() || '')
        stacks[to - 1].reverse()
        stacks[to - 1] = stacks[to - 1].filter(Boolean)
    }
    console.log(stacks[from - 1].join('-'))
    console.log(stacks[to - 1].join('-'))
    // console.log('==============')
    // break
}

let topCrates = ''
for (const stack of stacks) {
    topCrates += stack[0] || ''
}

console.log(stacks)
console.log(topCrates)