import { readFile } from 'fs/promises'

async function Main() {
    const fileContents = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '')
    const reports = fileContents.split('\n').map(s => s.split(' ').map(Number))
    let safeReportsCount = 0
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i]
        const sortedA = report.toSorted((a, b) => a - b)
        const sortedD = report.toSorted((a, b) => b - a)
        if (![sortedA.join(''), sortedD.join('')].includes(report.join(''))) continue
        let isSafe = true
        for (let j = 1; j < report.length; j++) {
            const currLevel = report[j]
            const prevLevel = report[j - 1]
            const diff = Math.abs(currLevel - prevLevel)
            if (!(1 <= diff && diff <= 3)) {
                isSafe = false
                break
            }
        }
        if (isSafe) safeReportsCount++
    }
    return safeReportsCount
}

Main().then(console.log).catch(e => { throw e })