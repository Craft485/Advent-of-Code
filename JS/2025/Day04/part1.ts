import { readFile } from 'node:fs/promises'

const testcase = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const grid: ('.' | '@')[][] = data.trim().replace(/\r/g, '').split('\n').map(s => s.split('') as ('.' | '@')[])
    
    let total = 0
    for (let i = 0; i < grid.length; i++) {
        const isle = grid[i]
        for (let j = 0; j < isle.length; j++) {
            const cell = isle[j]
            if (cell === '.') continue

            let adjCount = 0
            adjCount += grid?.[i - 1]?.[j - 1] === '@' ? 1 : 0 // Top left
            adjCount += grid?.[i - 1]?.[j - 0] === '@' ? 1 : 0 // Top middle
            adjCount += grid?.[i - 1]?.[j + 1] === '@' ? 1 : 0 // Top right
            adjCount += grid?.[i - 0]?.[j - 1] === '@' ? 1 : 0 // Left
            adjCount += grid?.[i - 0]?.[j + 1] === '@' ? 1 : 0 // Right
            adjCount += grid?.[i + 1]?.[j - 1] === '@' ? 1 : 0 // Bottom left
            adjCount += grid?.[i + 1]?.[j - 0] === '@' ? 1 : 0 // Bottom middle
            adjCount += grid?.[i + 1]?.[j + 1] === '@' ? 1 : 0 // Bottom right

            if (adjCount < 4) total++
        }
    }

    return total
}

console.log(await main())