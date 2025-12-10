import { readFile } from 'node:fs/promises'

const testcase = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const grid = data.trim().replace(/\r/g, '').split('\n').map(line => line.trim().replace(/\s+/g, ' ').split(' '))

    let total = 0
    const colCount = grid[0].length
    for (let j = 0; j < colCount; j++) {
        const op = grid.at(-1)[j]
        let result = 0
        for (let i = 0; i < grid.length - 1; i++) {
            const value = Number(grid[i][j])
            result = op === '*' ? (result || 1) * value : result + value
        }
        total += result
    }

    return total
}

console.log(await main())