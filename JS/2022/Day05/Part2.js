// THIS WON'T WORK IF YOU SET YOUR IDE TO USE LF INSTEAD OF CRLF
// I DON'T UNDERSTAND WHY CARRIAGE RETURNS EXIST
import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const initialStacks = input.split(`\r\n\r\n`)[0]
const rules = input.split(`\r\n\r\n`)[1].split(`\r\n`)
const stacks = [ [], [], [], [], [], [], [], [], [] ]
const rows = initialStacks.split('\r\n')

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
console.log(stacks)
for (const rule of rules) {
    const move = /move (\d+)/.exec(rule)[1]
    const from = /from (\d)/.exec(rule)[1]
    const to = /to (\d)/.exec(rule)[1]

    const boxesToMove = stacks[from - 1].slice(-move)
    stacks[to - 1] = stacks[to - 1].concat(boxesToMove)
    stacks[from - 1] = stacks[from - 1].slice(0, -move)
}

let topCrates = ''
for (const stack of stacks) {
    // The top crate is going to be the last element in the array
    topCrates += stack[stack.length - 1] || ''
}

console.log(topCrates)