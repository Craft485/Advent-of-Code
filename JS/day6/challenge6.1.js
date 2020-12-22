const { readFileSync:readFile } = require('fs')

const text = readFile('./input.txt', { encoding: 'utf-8' }).toString('utf-8')
const groups = text.replace(/\r/g, '').split('\n\n')
let count = 0
// For every group present
groups.forEach(group => {
    // Sets only allow unique values and don't do anything when a repeat value is given
    // Throw stuff at it and see what sticks!
    let groupAnswers = new Set()
    let people = group.trim().split('\n')
    // For every person in a group
    people.forEach(v => v.split('').forEach(v => groupAnswers.add(v)))
    count += groupAnswers.size
})

console.log(count)