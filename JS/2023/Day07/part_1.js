import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    const hands = inputData.replace(/\r/g, '').split('\n').filter(Boolean).map(s => s.split(' ').map((e, i) => i % 2 !== 0 ? Number(e) : e.split(''))),
    handTypes = [ [5], [4, 1], [3, 2], [3, 1], [2, 2], [2, 1], [1, 1] ],
    cardRankings = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ]

    /** @type string[][][] */
    const handRankings = new Array(7).fill(new Array())

    hands.forEach(hand => {
        const cards = hand[0]
        // Determine hand type
        let occurance = []
        cards.forEach(card => { const i = occurance.findIndex(m => m[0] === card); i >= 0 ? occurance[i][1]++ : occurance.push([card, 1]) })
        occurance.sort((a, b) => b[1] - a[1])
        occurance.length = 2
        occurance = occurance.flat().filter(x => Number(x) === x).filter(Boolean)
        const rank = handTypes.findIndex(x => x.join() === occurance.join())
        handRankings[rank] = handRankings[rank].concat([cards])
    })
    
    // Determine secondary rankings based on high card in order of occurance
    handRankings.forEach(handRank => {
        if (handRank.length > 1) {
            handRank.sort((a, b) => {
                const mappedA = a.map(x => cardRankings.findIndex(a => a === x)),
                mappedB = b.map(x => cardRankings.findIndex(a => a === x)),
                filteredMapA = mappedA.filter((v, i) => mappedB[i] !== v),
                filteredMapB = mappedB.filter((v, i) => mappedA[i] !== v)

                return filteredMapA[0] > filteredMapB[0] ? 1 : -1
            })
        }
    })

    let rank = 1, result = 0
    handRankings.reverse().forEach(handRank => handRank.forEach(hand => result += hands.find(v => v[0].join('') === hand.join(''))[1] * rank++ ))

    console.info(result)
})