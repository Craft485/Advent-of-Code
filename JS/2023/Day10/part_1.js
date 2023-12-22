import { readFile } from 'fs'

const pipeDirections = {
    '|': [ 'NORTH', 'SOUTH' ], // Connects north and south
    '-': [ 'WEST' , 'EAST'  ], // Connects west and east
    'L': [ 'NORTH', 'EAST'  ], // Connects north and east
    'J': [ 'NORTH', 'WEST'  ], // Connects north and west
    '7': [ 'SOUTH', 'WEST'  ], // Connects south and west
    'F': [ 'SOUTH', 'EAST'  ], // Connects south and east
}

const directionSwapMap = {
    'NORTH': 'SOUTH',
    'SOUTH': 'NORTH',
    'EAST': 'WEST',
    'WEST': 'EAST'
}

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    const fullPipeMap = inputData.replace(/\r/g, '').split('\n').filter(Boolean).map(s => s.split('')),
    startingCoords = [ fullPipeMap.findIndex(row => row.includes('S')), fullPipeMap.find(row => row.includes('S')).findIndex(col => col === 'S') ]
    // Steps is initalized as 1 because we are artifically take the first step to enter the loop before doing things automatically
    let position = startingCoords, steps = 1, currentChar = null, direction = null, possibleStartingLocationsRawData = [
        [fullPipeMap[startingCoords[0]][startingCoords[1] - 1], [startingCoords[0], startingCoords[1] - 1]], // Left
        [fullPipeMap[startingCoords[0]][startingCoords[1] + 1], [startingCoords[0], startingCoords[1] + 1]], // Right
        [fullPipeMap[startingCoords[0] + 1][startingCoords[1]], [startingCoords[0] + 1, startingCoords[1]]], // Below
        [fullPipeMap[startingCoords[0] - 1][startingCoords[1]], [startingCoords[0] - 1, startingCoords[1]]]  // Above
    ].filter(x => Boolean(x[0])).map(locationData => {
        const locationChar = locationData[0], coords = locationData[1], validDirections = pipeDirections[locationChar] || [], validDestinations = []
        validDirections.forEach(direction => {
            const destinationCoords = JSON.parse(`[${coords}]`)
            switch (direction) {
                case 'NORTH':
                    destinationCoords[0]--
                    break;
                case 'SOUTH':
                    destinationCoords[0]++
                    break
                case 'EAST':
                    destinationCoords[1]++
                    break
                case 'WEST':
                    destinationCoords[1]--
                    break
                default:
                    break;
            }
            validDestinations.push([fullPipeMap[destinationCoords[0]]?.at(destinationCoords[1]), direction, destinationCoords, coords])
        })
        const validDestination = validDestinations.find(x => x[0] === 'S')
        if (validDestination) {
            currentChar = locationChar
            // The direction that we are interested in here is the direction in wich we entered the current cell which is the direction in which the S character is in this case
            direction = validDestination[1]
            position = coords
        }
        return validDestination
    })
    
    while (currentChar !== 'S') {
        const exitDirection = pipeDirections[currentChar].filter(x => x !== direction)[0]
        exitDirection === 'NORTH' ? position[0]-- : exitDirection === 'SOUTH' ? position[0]++ : exitDirection === 'EAST' ? position[1]++ : position[1]--
        currentChar = fullPipeMap[position[0]][position[1]]
        direction = directionSwapMap[exitDirection]
        steps++
    }
    console.info(steps / 2)
})