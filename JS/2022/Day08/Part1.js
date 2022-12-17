import fs from 'fs'

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\r\n')

let numOfVisibleTrees = 0

for (let rowNum = 0; rowNum < input.length; rowNum++) {
    const row = input[rowNum]
    for (let colNum = 0; colNum < row.length; colNum++) {
        const currentTreeHeight = row[colNum]
        // Look behind in the row, left in the row, above the col and below the col
        // Using b - a for the sort is the same as doing a - b then reversing the result
        const treesBehind = row.slice(0, colNum).split('').sort((a, b) => { return b - a }).map(x => parseInt(x))
        const treesAhead = row.slice(colNum + 1).split('').sort((a, b) => { return b - a }).map(x => parseInt(x))
        const treesAbove = []
        const treesBelow = []
        for (let i = 0; i < rowNum; i++) treesAbove.push(parseInt(input[i][colNum]))
        for (let i = rowNum + 1; i < input.length; i++) treesBelow.push(parseInt(input[i][colNum]))
        treesAbove.sort((a, b) => { return b - a })
        treesBelow.sort((a, b) => { return b - a })
        if (treesBehind.length === 0 || treesAhead.length === 0 || treesAbove.length === 0 || treesBelow.length === 0) {
            numOfVisibleTrees++
            continue
        }
        if (currentTreeHeight > treesBehind[0]) { numOfVisibleTrees++; continue }
        if (currentTreeHeight > treesAhead[0]) { numOfVisibleTrees++; continue }
        if (currentTreeHeight > treesAbove[0]) { numOfVisibleTrees++; continue }
        if (currentTreeHeight > treesBelow[0]) { numOfVisibleTrees++; continue }
    }
}

console.info(numOfVisibleTrees)