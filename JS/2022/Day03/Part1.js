import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

// End of line is either \n\n or \r\n
const rucksacks = input.split(`${input.includes('\r') ? '\r' : '\n'}\n`)
const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let sum = 0

for (const rucksack of rucksacks) {
    const firstCompartment = rucksack.substring(0, rucksack.length / 2)
    const secondCompartment = rucksack.substring(rucksack.length / 2)

    for (const char of firstCompartment) {
        if (secondCompartment.includes(char)) {
            sum += priorities.indexOf(char) + 1
            break
        }
    }
}

console.info(sum)