const fs = require('fs')

const file = fs.readFileSync('./slope.txt')
const slope = file.toString('utf-8').split('\n')

let j = 0
let treeCount = 0
for (let i = 0; i < slope.length; i++) {
    // I is for each row, J is for each position in that row
    if (slope[i][j] === "#") treeCount++
    j += 3
    // Wrap around to the next row, we have overextended 
    if (j >= slope[i].trim().length) j -= slope[i].trim().length
}

console.log(`Tree count: ${treeCount}`)