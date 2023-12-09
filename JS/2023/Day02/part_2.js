import { readFile } from 'fs'

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err

    // Parse input
    /** @type string[] */
    const games = data.replaceAll('\r', '').split('\n').filter(Boolean)

    let result = 0

    games.forEach(game => {
        const possibleLookUpTable = {
            red: 0,
            green: 0,
            blue: 0
        }
        game = game.replace(/Game (\d{1,}): /, '')
        const rounds = game.split('; ').map(round => round.split(', ').map(dataPointPair => dataPointPair.split(' ').map(dataPoint => Number(dataPoint) ? parseInt(dataPoint) : dataPoint)))
        for (let i = 0; i < rounds.length; i++) {
            const round = rounds[i]
            for (let j = 0; j < round.length; j++) {
                const dataPointPair = round[j]
                // console.log(dataPointPair)
                /** @type number */
                const count = dataPointPair[0]
                /** @type string */
                const color = dataPointPair[1]
                if (possibleLookUpTable[color] < count) {
                    possibleLookUpTable[color] = count
                }
            }
        }
        result += eval(Object.values(possibleLookUpTable).join('*'))
    })

    console.info(result)
})