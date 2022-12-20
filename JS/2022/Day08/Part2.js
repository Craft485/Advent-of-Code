import fs from 'fs'

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\r\n')

let totalScenicScore = 0

for (let rowNum = 0; rowNum < input.length; rowNum++) {
  const row = input[rowNum]
  for (let colNum = 0; colNum < row.length; colNum++) {
    const currentTreeHeight = row[colNum]
    let scenicScoreBehind = 0
    let scenicScoreAhead = 0
    let scenicScoreAbove = 0
    let scenicScoreBelow = 0
    // Look behind in the row, left in the row, above the col and below the col
    // Using b - a for the sort is the same as doing a - b then reversing the result
    const treesBehind = row.slice(0, colNum).split('').map(x => parseInt(x)).reverse()
    const treesAhead = row.slice(colNum + 1).split('').map(x => parseInt(x))
    const treesAbove = []
    const treesBelow = []
    for (let i = 0; i < rowNum; i++) treesAbove.push(parseInt(input[i][colNum]))
    for (let i = rowNum + 1; i < input.length; i++) treesBelow.push(parseInt(input[i][colNum]))
    treesAbove.reverse()
    for (const tree of treesBehind) if (currentTreeHeight > tree) { scenicScoreBehind++ } else if (tree >= currentTreeHeight) { scenicScoreBehind++; break }
    for (const tree of treesAhead) if (currentTreeHeight > tree) { scenicScoreAhead++ } else if (tree >= currentTreeHeight) { scenicScoreAhead++; break }
    for (const tree of treesAbove) if (currentTreeHeight > tree) { scenicScoreAbove++ } else if (tree >= currentTreeHeight) { scenicScoreAbove++; break }
    for (const tree of treesBelow) if (currentTreeHeight > tree) { scenicScoreBelow++ } else if (tree >= currentTreeHeight) { scenicScoreBelow++; break }
    const finalScore = scenicScoreBehind * scenicScoreAhead * scenicScoreAbove * scenicScoreBelow
    if (totalScenicScore < finalScore) totalScenicScore = finalScore
  }
}

console.log(totalScenicScore)