import { readFile } from 'fs/promises'

async function Main() {
    const lines = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n')
    let XMASCount = 0
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        for (let j = 0; j < line.length; j++) {
            if (line[j] !== 'X') continue
            XMASCount += [
                ['X', line[j + 1] || '', line[j + 2] || '', line[j + 3] || ''].join(''), // Look right
                ['X', line[j - 1] || '', line[j - 2] || '', line[j - 3] || ''].join(''), // Look left
                ['X', lines[i + 1]?.[j] || '', lines[i + 2]?.[j] || '', lines[i + 3]?.[j] || ''].join(''), // Look down
                ['X', lines[i - 1]?.[j] || '', lines[i - 2]?.[j] || '', lines[i - 3]?.[j] || ''].join(''), // Look up
                ['X', lines[i - 1]?.[j + 1] || '', lines[i - 2]?.[j + 2] || '', lines[i - 3]?.[j + 3] || ''].join(''), // Look up and right
                ['X', lines[i - 1]?.[j - 1] || '', lines[i - 2]?.[j - 2] || '', lines[i - 3]?.[j - 3] || ''].join(''), // Look up and left
                ['X', lines[i + 1]?.[j + 1] || '', lines[i + 2]?.[j + 2] || '', lines[i + 3]?.[j + 3] || ''].join(''), // Look down and right
                ['X', lines[i + 1]?.[j - 1] || '', lines[i + 2]?.[j - 2] || '', lines[i + 3]?.[j - 3] || ''].join('') // Look down and left
            ].filter(s => s === 'XMAS').length
        }
    }
    return XMASCount
}

Main().then(console.log).catch(e => { throw e })