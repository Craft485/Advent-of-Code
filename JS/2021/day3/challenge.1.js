const { readFileSync:readFile } = require('fs')

const input = readFile('./input.txt', { encoding: 'utf-8' }).toString('utf-8').replace(/\r/g, '')

const list = input.split('\n')
const colArray = new Array(list[0].length)

let gamma = ''
let epsilon = ''

// Generate column array data
for (let i = 0; i < list.length; i++) for (let j = 0; j < list[i].length; j++) colArray[j] ? colArray[j] += list[i][j] : colArray[j] = list[i][j]

// Parse column data
for (let k = 0; k < colArray.length; k++) {
    let zeroCount = 0
    let oneCount = 0
    for (let l = 0; l < colArray[k].length; l++) {
        // Look at each individual char in column
        colArray[k][l] === '1' ? oneCount++ : zeroCount++
    }
    if (zeroCount > oneCount) {
        gamma += '0'
        epsilon += '1'
    } else if (oneCount > zeroCount) {
        gamma += '1'
        epsilon += '0'
    } else if (oneCount === zeroCount) {
        console.warn('One count and zero count are the same for column: ' + k)
    }
}

console.log(`Gamma: ${parseInt(gamma, 2)} | Epsilon: ${parseInt(epsilon, 2)} | Product: ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`)