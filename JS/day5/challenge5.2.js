const { readFileSync:readFile } = require('fs')

const text = readFile('./input.txt', { encoding: 'utf-8' }).toString('utf-8')
const entries = text.split('\n')

let idArr = []
let allPossibleSeats = []

for (let i = 0; i < entries.length; i++) {
    // Create an array representing 128 rows and another for 8 rows
    let row = Array.from(Array(128).keys()), c = Array.from(Array(8).keys())

    const entry = entries[i].trim()
    let a = entry.substr(0, 7), b = entry.substr(7)

    // The first 7 are going to be F or B
    a.split('').forEach(v => {
        if (v === 'F') { 
            row = row.slice(0, row.length / 2); 

        } else if (v === 'B') {
            row = row.slice(row.length / 2, row.length)
        }
    })
    // The last 3 will be either L or R
    b.split('').forEach(v => {
        if (v === "R") {
            c = c.slice(c.length / 2, c.length); 
        } else if (v === "L") { 
            c = c.slice(0, c.length / 2)}
        })
    idArr.push(row[0] * 8 + c[0])
}
idArr.sort((a, b) => a - b)

for (k = idArr[0]; k < idArr[idArr.length - 1]; k++) allPossibleSeats[k] = k

// Create a Set containing all of the seats that are assigned
var set_of_occupied_seats = new Set(idArr)
// Filter the Array of all possible seats based on whether a given seat is *not* in the Set of occupied seats
console.log('Missing: ' + allPossibleSeats.filter( x => !set_of_occupied_seats.has(x)))