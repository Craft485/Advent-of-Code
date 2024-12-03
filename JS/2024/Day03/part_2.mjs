import { readFile } from 'fs/promises'

const Main = async () => (await readFile('./input.txt', { encoding: 'utf-8' })).split('do()').reduce((result, segment) => result + segment.split('don\'t()')[0].match(/mul\(\d{1,3},\d{1,3}\)/g).reduce((acc, curr) => acc + curr.split(',').map(s => parseInt(s.replace(/[^\d]/g, ''))).reduce((a, b) => a * b), 0), 0)

Main().then(console.log).catch(e => { throw e })