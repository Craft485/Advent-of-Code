import { readFile } from "node:fs/promises"

const testcase = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

const MAX_VALUE = 99
const MIN_VALUE = 0

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const instructions: [direction: 'L' | 'R', amount: number][] = data.trim().replace(/\r\n/g, '\n').split('\n').map(s => [s[0] as 'L' | 'R', +/\d{1,2}$/.exec(s)[0]])
    let currPos = 50
    console.log('currPos: 50')
    let result = 0
    console.log(instructions)
    for (const [direction, distance] of instructions) {
        if (direction === 'L') {
            currPos -= distance
            if (currPos < MIN_VALUE) currPos += (MAX_VALUE + 1)
        } else {
            currPos += distance
            if (currPos > MAX_VALUE) currPos -= (MAX_VALUE + 1)
        }
        if (currPos === 0) result++
        console.log(`currPos: ${currPos}`)
    }
    return result
}

console.log(await main())