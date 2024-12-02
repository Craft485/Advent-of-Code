import { readFile } from 'fs/promises'

function CheckReportLevels(report) {
    let unsafeLevels = 0
    for (let j = 1; j < report.length; j++) {
        const currLevel = report[j]
        const prevLevel = report[j - 1]
        const diff = Math.abs(currLevel - prevLevel)
        if (!(1 <= diff && diff <= 3)) unsafeLevels++
    }
    return unsafeLevels
}

async function Main() {
    const fileContents = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '')
    const reports = fileContents.split('\n').map(s => s.split(' ').map(Number))
    let safeReportsCount = 0
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i]
        const allLevels = report.join()
        const sortedA = [...report].sort((a, b) => a - b).join()
        const sortedD = [...report].sort((a, b) => b - a).join()
        let isSafelySorted = true
        let problemDampenerIndexForSort = -1
        const problemDampenerForSorting = new Set()
        if (![sortedA, sortedD].includes(allLevels)) {
            isSafelySorted = false
            for (let j = 0; j < report.length; j++) {
                const newReport = [...report]
                newReport.splice(j, 1)
                const sortedASpliced = [...newReport].sort((a, b) => a - b).join()
                const sortedDSpliced = [...newReport].sort((a, b) => b - a).join()
                if ([sortedASpliced, sortedDSpliced].includes(newReport.join()) && CheckReportLevels(newReport) === 0) {
                    isSafelySorted = true
                    problemDampenerIndexForSort = j
                    problemDampenerForSorting.add(j)
                }
            }
        }
        let unsafeLevels = CheckReportLevels(report)
        let isSafe = true
        let problemDampenerIndexForLevels = -1
        const problemDampenerForLevels = new Set()
        if (unsafeLevels > 0) {
            isSafe = false
            for (let j = 0; j < report.length; j++) {
                const newReport = [...report]
                newReport.splice(j, 1)
                const newUnsafeLevels = CheckReportLevels(newReport)
                if (newUnsafeLevels === 0) {
                    isSafe = true
                    problemDampenerIndexForLevels = j
                    problemDampenerForLevels.add(j)
                }
            }
        }
        if (isSafe && 
            isSafelySorted && 
            (
                (
                    problemDampenerForLevels.size === 0 && 
                    problemDampenerForSorting.size >= 0
                ) || (
                    problemDampenerForSorting.size === 0 && 
                    problemDampenerForLevels.size >= 0
                ) || 
                problemDampenerForSorting.intersection(problemDampenerForLevels).size > 0
            )
        ) safeReportsCount++
    }
    return safeReportsCount
}

Main().then(console.log).catch(e => { throw e })