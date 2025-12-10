import { readFile } from 'node:fs/promises'

const testcase = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const grid = data.replace(/\r/g, '').split('\n').map(line => line.split(''))

    const operations: ('*' | '+')[] = grid.at(-1).filter(c => c !== ' ') as ('*' | '+')[]
    // const transposedGrid = grid[0].map((_, i) => grid.map(row => row[i]))
    const formattedTransposedGrid: (number | null)[] = grid[0].map((_, i) => grid.map(row => row[i])).map(s => +s.slice(0, s.length - 1).join('').replace(/ /g, '') || null)

    let total = 0
    let opIndex = 0
    let currRes = 0
    for (const cell of formattedTransposedGrid) {
        if (cell === null) {
            opIndex++
            total += currRes
            currRes = 0
            continue
        }
        currRes = operations[opIndex] === '*' ? (currRes || 1) * cell : currRes + cell
    }

    return total + currRes
}

console.log(await main())