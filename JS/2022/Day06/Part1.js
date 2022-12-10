import fs from 'fs'

const input = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim()

for (let i = 0; i < input.length; i++) {
    const set = new Set(input.slice(i, i + 4))
    if (set.size === 4) {
        console.info(i + 4)
        break
    }
}