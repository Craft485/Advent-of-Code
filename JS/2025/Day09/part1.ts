import { readFile } from 'node:fs/promises'

const testcase = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const points: [x: number, y: number][] = data.trim().replace(/\r/g, '').split('\n').map(point => point.split(',').map(Number)) as [x: number, y: number][]

    const areas: number[] = []
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i]
        let maxCurrArea = 0
        for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j]
            const area = (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs(p1[1] - p2[1]) + 1)
            if (area > maxCurrArea) {
                maxCurrArea = area
            }
        }
        areas.push(maxCurrArea)
    }
    // console.log(areas)
    return Math.max(...areas)
}

console.log(await main())