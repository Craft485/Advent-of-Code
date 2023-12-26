import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    const parsedMap = inputData.replace(/\r/g, '').split('\n').filter(Boolean).map(s => s.split('')),
    /** @type string[][] */ formattedParsedMap = JSON.parse(JSON.stringify(parsedMap)),
    /** @type number[][] */ galaxyLocations = []
    let result = 0
    // Locate galaxies
    formattedParsedMap.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === '#') {
                galaxyLocations.push([i, j])
            }
        })
    })
    // Add additional rows where needed
    for (let i = parsedMap.length - 1; i > 0; i--) {
        if (!parsedMap[i].includes('#')) {
            // formattedParsedMap.splice(i, 0, new Array(parsedMap[0].length).fill('.'))
            // For every galaxy below the current row, increment their row coord by 1 million
            galaxyLocations.forEach(galaxy => {
                if (galaxy[0] > i) galaxy[0] += 999999
            })
        }
    }
    // Add additional columns where needed
    for (let j = parsedMap[0].length - 1; j > 0; j--) {
        // Construct column
        const col = []
        parsedMap.forEach(row => col.push(row[j]))
        if (!col.includes('#')) {
            // formattedParsedMap.forEach(row => row.splice(j, 0, '.'))
            // For every galaxy to the right of the current column, increment their column coord by 1 million
            galaxyLocations.forEach(galaxy => {
                if (galaxy[1] > j) galaxy[1] += 999999
            })
        }
    }

    // Compute distance beteween every galaxy pair
    for (let i = 0; i < galaxyLocations.length - 1; i++) {
        for (let j = i + 1; j < galaxyLocations.length; j++) {
            const deltaY = galaxyLocations[j][0] - galaxyLocations[i][0]
            const deltaX = galaxyLocations[galaxyLocations[i][1] > galaxyLocations[j][1] ? i : j][1] - galaxyLocations[galaxyLocations[i][1] > galaxyLocations[j][1] ? j : i][1]
            result += deltaY + deltaX
        }
    }
    console.info(result)
})