const { readFileSync:readFile } = require('fs')

const input = readFile('./input.txt', { encoding: 'utf-8' }).toString('utf-8')

const list = input.split('\n')
let depth = 0
let horizontalPos = 0
let aim = 0
for (let i = 0; i < list.length; i++) {
    const dir = list[i].split(' ')[0]
    const count = list[i].split(' ')[1]
    if (dir.toLowerCase() === 'up') {
        aim -= parseInt(count)
    } else if (dir.toLowerCase() === 'down') {
        aim += parseInt(count)
    } else {
        // Direction is forward
        horizontalPos += parseInt(count)
        depth += aim * parseInt(count)
    }
}

console.log(`${depth} | ${horizontalPos} | ${depth * horizontalPos}`)