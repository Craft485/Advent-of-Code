import { readFile } from 'node:fs/promises'

const testcase = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const ranges: [lower: number, upper: number][] = data.trim().split(',').map(range => range.split('-').map(Number) as [number, number])
    let result = 0
    for (const [lower, upper] of ranges) {
        let curr = lower
        while (curr <= upper) {
            if (/^(\d*)\1+$/.test(String(curr))) result += curr
            curr++
        }
    }
    return result
}

console.log(await main())