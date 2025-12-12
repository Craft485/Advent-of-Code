import { readFile } from 'node:fs/promises'

const testcase = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

function AddPositionToSet(set: [position: number, count: number][], newPos: [x: number, c: number]): void {
    const setIndex = set.findIndex(pos => pos[0] === newPos[0])
    if (setIndex >= 0) {
        // Position already exists, add count to it
        set[setIndex][1] += newPos[1]
    } else {
        // Position does not already exist, add it (as a copy)
        set.push([...newPos])
    }
}

// Basic BFS graph traversal/discovery
async function main() {
    const data = (await readFile('./input.txt', { encoding: 'utf-8' }))
    const grid: ('.' | 'S' | '^')[][] = data.replace(/\r/g, '').trim().split('\n').map(line => line.split('')) as ('.' | 'S' | '^')[][]
    let currentPositions: [xPos: number, count: number][] = [ [grid[0].findIndex(c => c === 'S'), 1] ]
    // console.log(grid)
    for (let currY = 1; currY < grid.length; currY++) {
        const nextSetOfPositions: typeof currentPositions = []
        for (let i = 0; i < currentPositions.length; i++) {
            const currPos = currentPositions[i]
            const [ currX, count ] = currPos
            const currCell = grid[currY][currX]
            if (currCell === '^') {
                // Split
                const left = currX - 1
                AddPositionToSet(nextSetOfPositions, [left, count])
                const right = currX + 1
                AddPositionToSet(nextSetOfPositions, [right, count])
            } else {
                // Copy current position into nextSetOfPositions
                AddPositionToSet(nextSetOfPositions, currPos)
            }
        }
        currentPositions = nextSetOfPositions
    }
    // console.log(currentPositions)
    return currentPositions.reduce((acc, curr) => acc + curr[1], 0)
}

console.log(await main())