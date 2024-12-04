import { readFile } from 'fs/promises'

async function Main() {
    const lines = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n')
    let XMASCount = 0
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        for (let j = 0; j < line.length; j++) {
            if (line[j] !== 'A') continue
            XMASCount += [
                [lines[i - 1]?.[j - 1] || '', 'A', lines[i + 1]?.[j + 1] || ''].join(''), // Look top left to bottom right
                [lines[i + 1]?.[j - 1] || '', 'A', lines[i - 1]?.[j + 1] || ''].join('') // Look bottom left to top right
            ].filter(s => /^MAS|SAM$/.test(s)).length === 2 ? 1 : 0
        }
    }
    return XMASCount
}

Main().then(console.log).catch(e => { throw e })