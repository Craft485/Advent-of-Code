import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const pairs = input.split(`${input.includes('\r') ? '\r' : '\n'}\n`)

let finalCount = 0

for (const pair of pairs) {
    const ranges = pair.split(',')
    const firstElfRanges = ranges[0].split('-')
    const firstElfMin = parseInt(firstElfRanges[0])
    const firstElfMax = parseInt(firstElfRanges[1])
    const secondElfRanges = ranges[1].split('-')
    const secondElfMin = parseInt(secondElfRanges[0])
    const secondElfMax = parseInt(secondElfRanges[1])
    finalCount += ((firstElfMin <= secondElfMin && firstElfMax >= secondElfMax) || (secondElfMin <= firstElfMin && secondElfMax >= firstElfMax)) ? 1 : 0
}

console.info(finalCount)