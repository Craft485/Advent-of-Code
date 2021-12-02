const { readFileSync:readFile } = require('fs')

const text = readFile("./list.txt").toString('utf-8')
const entries = text.split('\n\n')[0].split('\r\n\r\n')
// We don't care about a cid field as its considered optional
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
let validPassportCount = 0
// For each entry/passport
myFor:
for (let i = 0; i < entries.length; i++) {
    let fields = new Map
    // Normalize/clean up data
    entries[i].replace(/(\r\n|\n|\r)/gm, ' ').trim().split(' ').forEach(s => {
        const key = s.split(':')[0]
        const value = s.split(':')[1].trim()
        fields.set(key, value)
    })
    // Check each required field entry in the current passport
    let validFieldCount = 0
    for (let j = 0; j < requiredFields.length; j++) if (!(fields.has(requiredFields[j]))) continue myFor
    fields.forEach((v, k) => {
        // Yes, this is a mess
        switch (k) {
            case 'byr':
                if (v.match(/\d{4}$/g)[0].length === 4 && parseInt(v) >= 1920 && parseInt(v) <= 2002) validFieldCount++ 
                break;
            case 'iyr':
                if (v.match(/\d{4}$/g)[0].length === 4 && parseInt(v) >= 2010 && parseInt(v) <= 2020) validFieldCount++
                break;
            case 'eyr':
                if (v.match(/\d{4}$/g)[0].length === 4 && parseInt(v) >= 2020 && parseInt(v) <= 2030) validFieldCount++
                break;
            case 'hgt':
                const unit = v.substr(v.length - 2)
                const num = v.match(/\d+/g)[0]
                if ((unit === 'cm' && parseInt(num) >= 150 && parseInt(num) <= 193) || 
                    (unit === 'in' && parseInt(num) >= 59 && parseInt(num) <= 76)) validFieldCount++ 
                break;
            case 'hcl':
                
                if (v.substr(0, 1) === '#' && v.match(/[a-f0-9]{6}$/g)[0].length === 6) validFieldCount++
                break;
            case 'ecl':
                const foo = v.match(/(amb|blu|brn|gry|grn|hzl|oth)/g)
                if (foo !== null) if (foo.length === 1) validFieldCount++
                break;
            case 'pid':
                const bar = v.match(/^\d{9}$/g)
                if (bar !== null) if(bar[0].length === 9) validFieldCount++
                break;
            default:
                break;
        }
    })
    if (validFieldCount === requiredFields.length) validPassportCount++
}

console.log(`Valid passports found: ${validPassportCount}`)