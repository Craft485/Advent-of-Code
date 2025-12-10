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

    const [rawDB, _] = data.trim().replace(/\r/g, '').split('\n\n')
    let ranges = rawDB.split('\n').map(range => range.split('-').map(Number)).sort((a, b) => a[0] - b[0])

    const mergedRanges = []
    while (ranges.length > 0) {
        let [low, high] = ranges[0]
        console.log(low, high)
        for (let i = 1; i < ranges.length; i++) {
            const [low2, high2] = ranges[i]
            if (high < low2 || low > high2) { // Overlap is not possible
                // console.log(`\t${low2} ${high2} cannot overlap with ${low} ${high}`)
                continue
            }
            ranges[i] = null // Mark for deletion
            if (low <= low2 && high2 <= high) { // Range is contained within outer range
                // noop
                // console.log(`\t${low2} ${high2} is contained with ${low} ${high}`)
            } else if (low2 <= low && high2 <= high) { // Range overlaps low
                low = low2
                // console.log(`\t${low2} ${high2} overlaps low with ${low} ${high}`)
            } else if (low <= low2 && high <= high2) { // Range overlaps high
                high = high2
                // console.log(`\t${low2} ${high2} overlaps high with ${low} ${high}`)
            } else if (low2 <= low && high <= high2) { // Outer range contained within current range
                low = low2
                high = high2
                // console.log(`\t${low2} ${high2} contains with ${low} ${high}`)
            }
        }
        mergedRanges.push([low, high])
        ranges[0] = null
        ranges = ranges.filter(v => v !== null) // Clear out used ranges
    }
    // console.log(mergedRanges)
    return mergedRanges.reduce((acc, range) => acc + (range[1] - range[0]) + 1, 0)
}

console.log(await main())