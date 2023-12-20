import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    // Parse input
    const lines = inputData.replace(/\r/g, '').split('\n').filter(Boolean).map(x => x.split(' ').map(Number))
    let result = new Array(lines.length).fill(0)
    lines.forEach((line, lineIndex) => {
        const sequences = [ line ]
        while (sequences.at(-1).filter(Boolean).length !== 0) {
            sequences.push(sequences.at(-1).map((_, i, a) => a[i + 1] - a[i]).filter(x => !isNaN(x)))
        }
        for (const sequence of sequences) result[lineIndex] += sequence.at(-1)
    })
    console.info(eval(result.join('+')))
})