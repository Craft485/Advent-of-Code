import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

// End of line is either \n\n or \r\n
const rucksacks = input.split(`${input.includes('\r') ? '\r' : '\n'}\n`)
const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let sum = 0

for (let i = 0; i < rucksacks.length; i += 3) {
    const firstElf = rucksacks[i]
    const secondElf = rucksacks[i + 1]
    const thirdElf = rucksacks[i + 2]

    for (const char of firstElf) {
        if (secondElf.includes(char) && thirdElf.includes(char)) {
            sum += priorities.indexOf(char) + 1
            break
        }
    }
}

console.info(sum)