import { readFile } from 'fs/promises'

const testCase = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

async function Main() {
    const input = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n').map(s => s.split(''))
    console.log(input)
    let row = input.findIndex(row => row.includes('^'))
    console.log(row)
    let col = input[row].findIndex(col => col === '^')
    /** @type {Set<string>} */
    const visited = new Set([`${row}|${col}`])
    const directionTurnLookup = {
        up: 'right',
        right: 'down',
        down: 'left',
        left: 'up'
    }
    /** @type {'up' | 'down' | 'left' | 'right'} */
    let direction = 'up'
    while (-1 < row < input.length && -1 < col < input[0].length) {
        const newRow = direction === 'up' ? row - 1 : direction === 'down' ? row + 1 : row
        const newCol = direction === 'left' ? col - 1 : direction === 'right' ? col + 1 : col
        const char = input[newRow]?.[newCol]
        if (char === undefined) break
        if (char === '#') {
            direction = directionTurnLookup[direction]
            row = direction === 'up' ? row - 1 : direction === 'down' ? row + 1 : row
            col = direction === 'left' ? col - 1 : direction === 'right' ? col + 1 : col
        } else {
            row = newRow
            col = newCol
        }
        visited.add(`${row}|${col}`)
        input[row][col] = 'X'
    }
    console.log(input.map(s=>s.join('')).join('\n'))
    console.log(visited)
    return visited.size
}

Main().then(console.log).catch(e => { throw e })