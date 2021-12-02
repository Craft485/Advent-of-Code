const { readFileSync:readFile } = require('fs')

const input = readFile('./input.txt', { encoding: 'utf-8' }).toString('utf-8')
const list = input.split('\n')
let n = 0
for (let i = 1; i < list.length; i++) if (parseInt(list[i - 1]) < parseInt(list[i])) n++
console.log(n)