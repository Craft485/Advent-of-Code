import { readFile } from 'fs'

const numbers = [['one', 1],['two', 2],['three', 3],['four', 4],['five', 5],['six', 6],['seven', 7],['eight', 8],['nine', 9]]

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err

    // Parse input
    numbers.forEach(n => data = data.replaceAll(n[0], n[0][0] + n[1] + n[0][n[0].length - 1]))
    const lines = data.replaceAll('\r', '').split('\n').filter(Boolean)
    /** @type string[] */
    const values = []

    lines.forEach(line => {
        const parsedLine = line.split('').map(x => parseInt(x)).filter(Boolean)
        values.push(parsedLine[0] + `${parsedLine[parsedLine.length - 1]}`)
    })

    const result = eval(values.join('+'))
    console.info(result)
})