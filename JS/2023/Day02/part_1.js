import { readFile } from 'fs'

const colorLookup = {
    red: 12,
    green: 13,
    blue: 14
}

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err

    // Parse input
    /** @type string[] */
    const games = data.replaceAll('\r', '').split('\n').filter(Boolean)

    let result = 0

    games.forEach(game => {
        let possible = true
        const gameID = parseInt(game.match(/Game (\d{1,}): /)[1])
        game = game.replace(/Game (\d{1,}): /, '')
        const rounds = game.split('; ').map(round => round.split(', ').map(dataPointPair => dataPointPair.split(' ').map(dataPoint => Number(dataPoint) ? parseInt(dataPoint) : dataPoint)))
        for (let i = 0; i < rounds.length; i++) {
            const round = rounds[i]
            for (let j = 0; j < round.length; j++) {
                const dataPointPair = round[j]
                /** @type number */
                const count = dataPointPair[0]
                /** @type string */
                const color = dataPointPair[1]
                if (colorLookup[color] < count) {
                    possible = false
                    break
                }
            }
            if (!possible) break
        }
        if (possible) result += gameID
    })

    console.info(result)
})