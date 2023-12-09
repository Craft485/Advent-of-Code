import { readFile } from 'fs'

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err

    // Parse input
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