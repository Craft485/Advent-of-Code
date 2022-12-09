// THIS WON'T WORK IF YOU SET YOUR IDE TO USE LF INSTEAD OF CRLF
// I DON'T UNDERSTAND WHY CARRIAGE RETURNS EXIST
import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const initialStacks = input.split(`\r\n\r\n`)[0]
console.log(initialStacks)
const rules = input.split(`\r\n\r\n`)[1].split(`\r\n`)
console.log(rules)
const stacks = [ [], [], [], [], [], [], [], [], [] ]
const rows = initialStacks.split('\r\n')
console.log(rows)

for (const row of rows) {
    for (let i = 0; i < row.length; i += 4) {
        const crate = row.substring(i, i + 4).trim().replaceAll(/(\[|\])/g, '')
        // If its not a number or an empty string add it to its stack
        if (!Number(crate) && Boolean(crate)) {
            stacks[i / 4].push(crate)
        }
    }
}

// Stacks were generated top down, so the crate at the first index is at the top of the column
// It'll be easier later if this is reversed, where the top crate is at the end of the array
for (const stack of stacks) {
    stack.reverse()
}

for (const rule of rules) {
    const move = /move (\d)/.exec(rule)[1]
    const from = /from (\d)/.exec(rule)[1]
    const to = /to (\d)/.exec(rule)[1]
    // console.log('==============')
    console.log(`move: ${move}`)
    console.log(`from: ${from}`)
    console.log(`to: ${to}`)
    console.log(`from column before: ${stacks[from - 1].join(' ')}`)
    console.log(`to column after: ${stacks[to - 1].join(' ')}`)
    for (let i = 0; i < move; i++) {
        const element = stacks[from - 1].pop()
        if (element) {
            stacks[to - 1].push(element)
        } else break
    }
    // Array#filter(Boolean) will remove any possible empty strings since they will get read as false
    stacks[to - 1] = stacks[to - 1].filter(Boolean)
    console.log(`from column after: ${stacks[from - 1].join(' ')}`)
    console.log(`to column after: ${stacks[to - 1].join(' ')}`)
    // console.log('==============')
}

let topCrates = ''
for (const stack of stacks) {
    // The top crate is going to be the last element in the array
    topCrates += stack[stack.length - 1] || ''
}

console.log(stacks)
console.log(topCrates)