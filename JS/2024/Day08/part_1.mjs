import { readFile } from 'fs/promises'

const testcase = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

async function Main() {
    // (await readFile('./input.txt', { encoding: 'utf-8' }))
    const grid = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n').map(l => l.split(''))
    /** @type {Set<string>} */
    const antinodeLocations = new Set
    /** @type {{[frequnecy: string]: [row: number, col: number][]}} */
    const frequencyNodes = {}
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '.') continue
            frequencyNodes[grid[i][j]] = frequencyNodes[grid[i][j]] ? frequencyNodes[grid[i][j]].concat([[i, j]]) : [[i, j]]
        }
    }
    console.log(frequencyNodes)
    for (const locations of Object.values(frequencyNodes)) {
        for (let i = 0; i < locations.length - 1; i++) {
            const [x1, y1] = locations[i]
            const otherNodes = locations.slice(i + 1)
            // console.log(otherNodes)
            for (let j = 0; j < otherNodes.length; j++) {
                // console.log(j)
                // console.log(otherNodes[j])
                const [x2, y2] = otherNodes[j]
                const deltaX = Math.abs(x1 - x2)
                const deltaY = Math.abs(y1 - y2)
                const firstAntinode = [
                    x1 < x2 
                    ? x1 - deltaX
                    : 
                        x1 > x2 
                        ? x1 + deltaX
                        : x1,
                    y1 < y2
                    ? y1 - deltaY
                    :
                        y1 > y2
                        ? y1 + deltaY
                        : y1
                ]
                const secondAntinode = [
                    x1 < x2 
                    ? x2 + deltaX
                    : 
                        x1 > x2 
                        ? x2 - deltaX
                        : x2,
                    y1 < y2
                    ? y2 + deltaY
                    :
                        y1 > y2
                        ? y2 - deltaY
                        : y2
                ]
                if (grid[firstAntinode[0]]?.[firstAntinode[1]]) antinodeLocations.add(firstAntinode.join('|'))
                if (grid[secondAntinode[0]]?.[secondAntinode[1]]) antinodeLocations.add(secondAntinode.join('|'))
            }
        }
    }
    for (const [x, y] of Array.from(antinodeLocations).map(s => s.split('|').map(Number))) if (grid[x][y] === '.') grid[x][y] = '#'
    console.log(antinodeLocations)
    console.log(grid.map(s => s.join('')).join('\n'))
    return antinodeLocations.size
}

Main().then(console.log).catch(e => { throw e })