import { readFile } from 'fs/promises'

async function Main() {
    const input = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '')
    const locationIds = input.split('\n').map(s => s.split('   '))
    const leftCol = locationIds.flatMap(pair => parseInt(pair[0])).sort((a, b) => a - b)
    const rightCol = locationIds.flatMap(pair => parseInt(pair[1])).sort((a, b) => a - b)
    const distances = []
    for (let i = 0; i < locationIds.length; i++) distances.push(Math.abs(leftCol[i] - rightCol[i]))
    return distances.reduce((acc, curr) => acc + curr, 0)
}

Main().then(console.log).catch(e => {  throw e })