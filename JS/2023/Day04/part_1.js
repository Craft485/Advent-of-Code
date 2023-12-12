/**
 * Your input is a set of scratchoff cards with winning numbers and numbers on the card.
 * Figure out which winning numbers appear on each card,
 * the first match is worth one point with each subsequent match doubling the number of points that card is worth
 */

import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    let result = 0

    /** @type string[] */
    const cards = inputData.replace(/(Card {1,}\d+: )|\r/g, '').replace(/ {2,}/g, ' ').split('\n').map(s => s.trim()).filter(Boolean)

    cards.forEach(card => {
        const parts = card.split(' | '),
        winningNumbers = parts[0].split(' '),
        myNumbers = parts[1].split(' '),
        intersections = myNumbers.filter(x => winningNumbers.includes(x))

        let points = 0

        if (intersections.length > 0) {
            let counter = intersections.length
            while (counter > 0) {
                points ? points *= 2 : points++
                counter--
            }
        }

        result += points
    })

    console.info(result)
})