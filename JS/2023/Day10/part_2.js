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
    // mapCoordList starts with the starting coords because we are artifically stepping over the S char to start
    let position = startingCoords, area = 0, currentChar = null, sChar = null, direction = null, mapCoordList = [startingCoords], possibleStartingLocationsRawData = [
        [fullPipeMap[startingCoords[0]]?.at(startingCoords[1] - 1), [startingCoords[0], startingCoords[1] - 1]], // Left
        [fullPipeMap[startingCoords[0]]?.at(startingCoords[1] + 1), [startingCoords[0], startingCoords[1] + 1]], // Right
        [fullPipeMap[startingCoords[0] + 1]?.at(startingCoords[1]), [startingCoords[0] + 1, startingCoords[1]]], // Below
        [fullPipeMap[startingCoords[0] - 1]?.at(startingCoords[1]), [startingCoords[0] - 1, startingCoords[1]]]  // Above
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
    }).filter(Boolean)
    const s1 = directionSwapMap[possibleStartingLocationsRawData[0][1]], s2 = directionSwapMap[possibleStartingLocationsRawData[1][1]]
    sChar = Object.keys(pipeDirections)[Object.values(pipeDirections).findIndex(x => x.includes(s1) && x.includes(s2))]
    while (currentChar !== 'S') {
        mapCoordList.push(JSON.parse(`[${position}]`))
        const exitDirection = pipeDirections[currentChar].filter(x => x !== direction)[0]
        exitDirection === 'NORTH' ? position[0]-- : exitDirection === 'SOUTH' ? position[0]++ : exitDirection === 'EAST' ? position[1]++ : position[1]--
        currentChar = fullPipeMap[position[0]][position[1]]
        direction = directionSwapMap[exitDirection]
    }
    let inside = false
    for (let rowIndex = 0; rowIndex < fullPipeMap.length; rowIndex++) {
        const row = fullPipeMap[rowIndex]
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex] === 'S' ? sChar : row[colIndex], point = [rowIndex, colIndex]
            if (['L', '|', 'J'].includes(cell) && mapCoordList.map(x => x.join()).includes(point.join())) {
                inside = !inside
            } else if (!mapCoordList.map(x => x.join()).includes(point.join()) && inside) {
                area++
            }
        }
    }
    // The above nested for loop can be turned into the line below:
    // for (let rowIndex = 0; rowIndex < fullPipeMap.length; rowIndex++) for (let colIndex = 0; colIndex < fullPipeMap[rowIndex].length; colIndex++) ['L', '|', 'J'].includes(fullPipeMap[rowIndex][colIndex] === 'S' ? sChar : fullPipeMap[rowIndex][colIndex]) && mapCoordList.map(x => x.join()).includes([rowIndex, colIndex].join()) ? inside = !inside : !mapCoordList.map(x => x.join()).includes([rowIndex, colIndex].join()) && inside ? area++ : area += 0
    console.info(area)
})