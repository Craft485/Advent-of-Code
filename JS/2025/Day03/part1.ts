import { readFile } from 'node:fs/promises'

const testcase = `987654321111111
811111111111119
234234234234278
818181911112111`

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const banks = data.trim().replace(/\r/g, '').split('\n').map(bank => bank.split('').map(Number))
    let total = 0
    for (const bank of banks) {
        const maxValue = Math.max(...bank.slice(0, bank.length - 1))
        const maxValueIndex = bank.findIndex(v => v === maxValue)
        const secondMaxValue = bank.slice(maxValueIndex + 1).find((v, _, a) => v === Math.max(...a))
        const joltage = Number(`${maxValue}${secondMaxValue}`)
        total += joltage
    }
    return total
}

console.log(await main())