const fs = require('fs')

const file = fs.readFileSync('./list.txt')
const list = file.toString('utf-8').split('\n')

// Match every element to every other element
for (i = 0; i < list.length; i++) {
    for (j = 1; j < list.length; j++) {
        if (parseInt(list[i]) + parseInt(list[j]) === 2020) {
            console.log(`${parseInt(list[i])} + ${parseInt(list[j])} = 2020\nIndices: ${i}, ${j}\nFinal product: ${list[i] * list[j]}`)
            process.exit(1)
        }
    }
}