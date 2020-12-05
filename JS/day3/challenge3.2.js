const fs = require('fs')

const file = fs.readFileSync('./slope.txt')
const slope = file.toString('utf-8').split('\n')

const slopeValues = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

let treeTotal = 1
// Loop through each right down slope value set
for (let x = 0; x < slopeValues.length; x++) {
    let j = 0
    let treeCount = 0
    // Loop through the slope map
    for (let i = 0; i < slope.length; i += slopeValues[x][1]) {
        // I is for each row, J is for each position in that row
        if (slope[i][j] === "#") treeCount++
        j += slopeValues[x][0]
        // Wrap around to the next row, we have overextended 
        if (j >= slope[i].trim().length) j -= slope[i].trim().length
    }
    treeTotal *= treeCount
}

console.log(`Tree count: ${treeTotal}`)