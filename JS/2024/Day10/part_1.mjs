import { readFile } from 'fs/promises'

async function Main() {
    const grid = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n').map(s => s.split('').map(Number))
    /** @type {number[][]} */
    const trailHeads = []
    for (let i = 0; i < grid.length; i++) for (let j = 0; j < grid[i].length; j++) if (grid[i][j] === 0) trailHeads.push([i, j])
    console.log(`Found ${trailHeads.length} trail heads`)
    /** @type {string[]} */
    const reachablePeaks = []
    /** 
     * @param {number[][]} locs
     * @param {string[]} peaks 
     */
    function recurse(locs, peaks) {
        for (const loc of locs) {
            const nextLocs = []
            const elevation = grid[loc[0]][loc[1]]
            if (elevation === 9) {
                if (!peaks.find(point => point === loc.join(','))) peaks.push(loc.join(','))
                continue
            }
            if (grid[loc[0] - 1]?.[loc[1]] === elevation + 1) nextLocs.push([ loc[0] - 1, loc[1] ])
            if (grid[loc[0] + 1]?.[loc[1]] === elevation + 1) nextLocs.push([ loc[0] + 1, loc[1]])
            if (grid[loc[0]][loc[1] - 1] === elevation + 1) nextLocs.push([ loc[0], loc[1] - 1])
            if (grid[loc[0]][loc[1] + 1] === elevation + 1) nextLocs.push([ loc[0], loc[1] + 1])
            if (nextLocs.length) recurse(nextLocs, peaks)
        }
    }
    for (const head of trailHeads) {
        const peaksForCurrHead = []
        recurse([head], peaksForCurrHead)
        // console.log(`Curr head has ${peaksForCurrHead.length} peaks`)
        reachablePeaks.push(...peaksForCurrHead)
    }
    // console.log(reachablePeaks)
    return reachablePeaks.length
}

Main().then(console.log).catch(e => { throw e })