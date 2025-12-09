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
        let joltage = ''
        let lastChosenBatteryIndex = 0
        let numBatteriesLeft = 12
        while (joltage.length < numBatteriesLeft) {
            const sublist = bank.slice(joltage.length === 0 ? 0 : lastChosenBatteryIndex + 1, bank.length - ((numBatteriesLeft - 1) - joltage.length))
            const batteryValue = Math.max(...sublist)
            const batteryIndex = bank.findIndex((v, i) => v === batteryValue && i >= (joltage.length === 0 ? 0 : lastChosenBatteryIndex + 1))
            lastChosenBatteryIndex = batteryIndex
            joltage += `${batteryValue}`
        }
        total += Number(joltage)
    }
    return total
}

console.log(await main())