import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err
    
    // Parse inputData
    const lines = inputData.replace(/\r/g, '').replace(/ {2,}/g, ' ').split('\n').filter(Boolean),
    times = lines[0].replace('Time: ', '').split(' ').map(Number),
    distances = lines[1].replace('Distance: ', '').split(' ').map(Number)

    let result = 0
    times.forEach((totalRaceTime, index) => {
        const recordDistance = distances[index]
        let n = 0
        for (let holdTime = 0; holdTime < totalRaceTime; holdTime++) {
            const distanceTravelled = holdTime * (totalRaceTime - holdTime)
            if (distanceTravelled > recordDistance) n++
        }
        result = result === 0 ? n : result * n
    })

    console.info(result)
})