import { readFile } from 'fs/promises'

// Slighty more readable version
// const [ rules, updates ] = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n\n').map(s => s.split('\n').map(s2 => s2.split(/\||,/).map(Number)))
// return updates.filter(update => !rules.every(([a, b]) => update.indexOf(a) !== -1 && update.indexOf(b) !== -1 ? update.indexOf(a) < update.indexOf(b) : true)).map(update => update.sort((a, b, rule = rules.find(([x, y]) => x === a && y === b || x === b && y === a)) => rule ? rule.indexOf(b) - rule.indexOf(a) : 0)[Math.floor(update.length / 2)]).reduce((a, b) => a + b, 0)

// This one was a bit confusing
const Main = async _ => [(await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n\n').map(s => s.split('\n').map(s2 => s2.split(/\||,/).map(Number)))].map(([ rules, updates ]) => updates.filter(update => !rules.every(([a, b]) => update.indexOf(a) !== -1 && update.indexOf(b) !== -1 ? update.indexOf(a) < update.indexOf(b) : true)).map(update => update.sort((a, b, rule = rules.find(([x, y]) => x === a && y === b || x === b && y === a)) => rule ? rule.indexOf(b) - rule.indexOf(a) : 0)[Math.floor(update.length / 2)]).reduce((a, b) => a + b, 0))[0]

Main().then(console.log).catch(e => { throw e })