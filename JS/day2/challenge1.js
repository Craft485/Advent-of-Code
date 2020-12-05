const fs = require('fs')
// Read file with passwords, make resulting buffer a string
const file = fs.readFileSync('./pswrd.txt')
const text = file.toString('utf-8')
// Split the string into seperate parts that are easy to loop through
const lines = text.split('\n')

let rules = []
let char = []
let pswrd = []

let validCount = 0
// This is 100% NOT the best way to do this but meh
for (i = 0; i < lines.length; i++) {
    const line = lines[i].split(" ")
    rules.push(line[0])
    char.push(line[1].substring(0, 1))
    pswrd.push(line[2].trim())
}

// For every line
for (j = 0; j < lines.length; j++) {
    const min = rules[j].split('-')[0]
    const max = rules[j].split('-')[1]
    let charCount = 0
    // Loop through the string an check to see if the rule works
    for (k = 0; k < pswrd[j].length; k++) if (pswrd[j][k] === char[j]) charCount++
    if (charCount <= max && charCount >= min) validCount++
}

console.log(`Number of valid passwords found: ${validCount}`)