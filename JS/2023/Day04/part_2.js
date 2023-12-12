/**
 * Your input is a set of scratchcards with winning numbers and your numbers on the card.
 * 
 * Each win from a given card equals copies of the subsequent cards (one of each)
 * where the bound for number of cards after the current card is defined by the number of winning matches on the original/current card
 */

import { readFile } from 'fs'

const testCase = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    /** @type string[] */
    const cards = inputData.replace(/(Card {1,}\d+: )|\r/g, '').replace(/ {2,}/g, ' ').split('\n').map(s => s.trim()).filter(Boolean)

    const copies = {}
    for (let i = 0; i < cards.length; i++) copies[i] = 1

    cards.forEach((card, cardIndex) => {
        // Test card for winning numbers, update copies of winners in copies object
        const parts = card.split(' | '),
        intersections = parts[1].split(' ').filter(x => parts[0].split(' ').includes(x))

        if (intersections.length > 0) {
            while (intersections.length > 0) {
                copies[cardIndex + intersections.length] += copies[cardIndex]
                intersections.length--
            }
        }
    })

    const totalNumberOfCards = eval(Object.values(copies).join('+'))
    console.info(totalNumberOfCards)
})