import { readFile } from 'fs/promises'

async function Main() {
    const input = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '')
    const locationIds = input.split('\n').map(s => s.split('   '))
    const leftCol = locationIds.flatMap(pair => parseInt(pair[0]))
    const rightCol = locationIds.flatMap(pair => parseInt(pair[1]))
    let result = 0
    for (const n of leftCol) result += n * rightCol.filter(x => x === n).length
    return result
}

Main().then(console.log).catch(e => {  throw e })