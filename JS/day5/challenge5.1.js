const { readFileSync:readFile } = require('fs')

const text = readFile('./input.txt', { encoding: 'utf-8' }).toString('utf-8')
const entries = text.split('\n')

let highestID = 0

for (let i = 0; i < entries.length; i++) {
    // Create an array representing 128 rows and another for 8 rows
    let row = Array.from(Array(128).keys()), column = Array.from(Array(8).keys())
    const entry = entries[i].trim()
    let a = entry.substr(0, 7), b = entry.substr(7)
    // The first 7 are going to be F or B
    a.split('').forEach(v => {if (v === 'F') row = row.slice(0, row.length / 2); else if (v === 'B') row = row.slice(row.length / 2, row.length)})
    // The last 3 will be either L or R
    b.split('').forEach(v => {if (v === "L") column = column.slice(column.length / 2, column.length); else if (v === "R") column = column.slice(0, column.length / 2)})
    const c = row[0] * 8 + column[0]
    if (highestID < c) highestID = c
}

console.log(`Highest ID ${highestID}`)