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

for (j = 0; j < pswrd.length; j++) {
    const pos1 = parseInt(rules[j].split('-')[0])
    const pos2 = parseInt(rules[j].split('-')[1])
    // NOT 0 index
    if (pswrd[j][pos1 - 1] === char[j]) {
        if (pswrd[j][pos2 - 1] === char[j]) continue; else validCount++ // T, F
    } else if (pswrd[j][pos2 - 1] === char[j]) validCount++ // F, T
}

console.log(`Number of valid passwords found: ${validCount}`)