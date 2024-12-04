import { readFile } from 'fs/promises'

const Main = async () => (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n').reduce((total, line, i, lines) => total + line.split('').reduce((lineTotal, char, j) => lineTotal + (char === 'X' ? [ [lines[i - 1]?.[j - 1] || '', 'A', lines[i + 1]?.[j + 1] || ''].join(''), [lines[i + 1]?.[j - 1] || '', 'A', lines[i - 1]?.[j + 1] || ''].join('') ].filter(s => /^MAS|SAM$/.test(s)).length === 2 ? 1 : 0 : 0), 0), 0)

Main().then(console.log).catch(e => { throw e })