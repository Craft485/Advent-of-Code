const fs = require('fs')

const file = fs.readFileSync('./list.txt')
const list = file.toString('utf-8').split('\n')

// Match every element to every other element
for (i = 0; i < list.length; i++) {
    for (j = 1; j < list.length; j++) {
        for (k = 2; k < list.length; k++){
            if (parseInt(list[i]) + parseInt(list[j]) + parseInt(list[k]) === 2020) {
                console.log(`${parseInt(list[i])} + ${parseInt(list[j])} + ${parseInt(list[k])}= 2020\nIndices: ${i}, ${j}, ${k}\nFinal product: ${list[i] * list[j] * list[k]}`)
                process.exit(1)
            }
        }
    }
}