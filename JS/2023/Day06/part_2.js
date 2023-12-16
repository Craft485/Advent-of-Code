import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err
    
    // Parse inputData
    const lines = inputData.replace(/\r| /g, '').split('\n').filter(Boolean),
    time = parseInt(lines[0].replace('Time:', '')),
    recordDistance = parseInt(lines[1].replace('Distance:', ''))

    let result = 0
    for (let holdTime = 0; holdTime < time; holdTime++) {
        const distanceTravelled = holdTime * (time - holdTime)
        if (distanceTravelled > recordDistance) result++
    }

    console.info(result)
})