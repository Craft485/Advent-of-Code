import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim()

for (let i = 0; i < input.length; i++) {
    const set = new Set(input.slice(i, i + 14))
    if (set.size === 14) {
        console.info(i + 14)
        break
    }
}