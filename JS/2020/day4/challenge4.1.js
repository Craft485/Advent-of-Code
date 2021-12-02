const { readFileSync:readFile } = require('fs')

const text = readFile("./list.txt").toString('utf-8')
const entries = text.split('\n\n')[0].split('\r\n\r\n')
// We don't care about a cid field as its considered optional
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
let validPassportCount = 0
// For each entry/passport
for (let i = 0; i < entries.length; i++) {
    let fields = new Map
    // Normalize/clean up data
    entries[i].replace(/(\r\n|\n|\r)/gm, ' ').trim().split(' ').forEach( s => {
        const key = s.split(':')[0]
        const value = s.split(':')[1]
        fields.set(key, value)
    })
    // Check each required field entry in the current passport
    let validFieldCount = 0
    for (let j = 0; j < requiredFields.length; j++) if (fields.has(requiredFields[j])) validFieldCount++
    if (validFieldCount === requiredFields.length) validPassportCount++
}

console.log(`Valid passports found: ${validPassportCount}`)