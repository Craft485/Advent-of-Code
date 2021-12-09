// Note: Currently not working, had to take a solution off the reddit thread(found in challange.2), should come back and fix this up
let data = require('fs').readFileSync('./input.txt', { encoding: 'utf-8' }).toString('utf-8').trim().split(',').map(Number)

const school = new Array(8).fill(0)

// Populate initial data
for (const entry of data) school[entry]++
console.log(school)
let days = 0

while (days < 256) {
    days++

    // This is both the new amount of fish spawned as well as the amount of fish will go back to 6 days, so we will use this value twice
    const newFish = school[0]

    // The ones that currently have 7 days until reprodution will have 6, so we'll use this as the place to refresh the reproduction cycle
    school[6] += newFish

    // Move the first item in the list, now the new born fish, to the 7th index(8 days until reproduction)
    const e = school.shift()
    school.push(e)

    if (days % 10 === 0) console.log(school)
}

let x = 0

for (let i = 0; i < school.length; i++) x += school[i]

console.log([school.reduce((a, b) => a + b), x])