import { readFile } from 'fs/promises'

async function Main() {
    const grid = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n').map(l => l.split(''))
    /** @type {Set<string>} */
    const antinodeLocations = new Set
    /** @type {{[frequnecy: string]: [row: number, col: number][]}} */
    const frequencyNodes = {}
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '.') continue
            frequencyNodes[grid[i][j]] = frequencyNodes[grid[i][j]] ? frequencyNodes[grid[i][j]].concat([[i, j]]) : [[i, j]]
            antinodeLocations.add(`${i}|${j}`)
        }
    }
    // console.log(frequencyNodes)
    for (const locations of Object.values(frequencyNodes)) {
        for (let i = 0; i < locations.length - 1; i++) {
            const [x1, y1] = locations[i]
            const otherNodes = locations.slice(i + 1)
            for (let j = 0; j < otherNodes.length; j++) {
                const [x2, y2] = otherNodes[j]
                const deltaX = Math.abs(x1 - x2)
                const deltaY = Math.abs(y1 - y2)
                let firstAntinode = [
                    x1 < x2 ? x1 - deltaX : x1 > x2 ? x1 + deltaX : x1,
                    y1 < y2 ? y1 - deltaY : y1 > y2 ? y1 + deltaY : y1
                ], secondAntinode = [
                    x1 < x2 ? x2 + deltaX : x1 > x2 ? x2 - deltaX : x2,
                    y1 < y2 ? y2 + deltaY : y1 > y2 ? y2 - deltaY : y2
                ]
                let firstAntinodeIsValid = grid[firstAntinode[0]]?.[firstAntinode[1]] !== undefined
                let secondAntinodeIsValid = grid[secondAntinode[0]]?.[secondAntinode[1]] !== undefined
                while (firstAntinodeIsValid || secondAntinodeIsValid) {
                    if (grid[firstAntinode[0]]?.[firstAntinode[1]]) antinodeLocations.add(firstAntinode.join('|'))
                    if (grid[secondAntinode[0]]?.[secondAntinode[1]]) antinodeLocations.add(secondAntinode.join('|'))
                    const [x3, y3] = firstAntinode
                    const [x4, y4] = secondAntinode
                    firstAntinode = [
                        x3 < x4 ? x3 - deltaX : x3 > x4 ? x3 + deltaX : x3,
                        y3 < y4 ? y3 - deltaY : y3 > y4 ? y3 + deltaY : y3
                    ]
                    secondAntinode = [
                        x3 < x4 ? x4 + deltaX : x3 > x4 ? x4 - deltaX : x4,
                        y3 < y4 ? y4 + deltaY : y3 > y4 ? y4 - deltaY : y4
                    ]
                    firstAntinodeIsValid = grid[x3]?.[y3] !== undefined
                    secondAntinodeIsValid = grid[x4]?.[y4] !== undefined
                }
            }
        }
    }

    for (const [x, y] of Array.from(antinodeLocations).map(s => s.split('|').map(Number))) if (grid[x][y] === '.') grid[x][y] = '#'
    // console.log(antinodeLocations)
    console.log(grid.map(s => s.join('')).join('\n'))
    
    return antinodeLocations.size
}

Main().then(console.log).catch(e => { throw e })