import { readFile } from 'node:fs/promises'

const testcase = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })

    const [rawDB, rawIDs] = data.trim().replace(/\r/g, '').split('\n\n')
    const db = rawDB.split('\n').map(range => range.split('-').map(Number))
    const ids = rawIDs.split('\n').map(Number)

    let total = 0

    for (const id of ids) {
        total += db.find(range => range[0] <= id && id <= range[1]) ? 1 : 0
    }

    return total
}

console.log(await main())