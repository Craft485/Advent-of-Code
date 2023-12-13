// Day 5: If You Give A Seed A Fertilizer - This one is really strange and has a long explanation: https://adventofcode.com/2023/day/5

import { readFile } from 'fs'

const testCase = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    // Parse input data
    const almanac = inputData.replace(/\r/g, '').split('\n\n').map(s => s.trim()).filter(Boolean),
    seedList = almanac.shift().replace('seeds: ', '').split(' ').map(Number).map((value, index, array) => index % 2 === 0 ? [ value, value + array[index + 1] - 1 ] : null).filter(x => x !== null),
    seedToSoilMap = almanac.shift().replace('seed-to-soil map:', '').trim().split('\n'),
    soilToFertilizerMap = almanac.shift().replace('soil-to-fertilizer map:', '').trim().split('\n'),
    fertilizerToWaterMap = almanac.shift().replace('fertilizer-to-water map:', '').trim().split('\n'),
    waterToLightMap = almanac.shift().replace('water-to-light map:', '').trim().split('\n'),
    lightToTempMap = almanac.shift().replace('light-to-temperature map:', '').trim().split('\n'),
    tempToHumidityMap = almanac.shift().replace('temperature-to-humidity map:', '').trim().split('\n'),
    humidityToLocationMap = almanac.shift().replace('humidity-to-location map:', '').trim().split('\n'),
    condensedMapList = [ seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTempMap, tempToHumidityMap, humidityToLocationMap ],
    steps = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'],
    /** @type number[][][][] */
    expandedMapList = []

    // Populate expandedMapList
    condensedMapList.forEach(map => {
        const expandedMap = []
        map.forEach(entry => {
            // Add the source range and destination ranges to a 2d array
            const mapData = entry.split(' ').map(Number),
            destinationRangeStart = mapData[0],
            sourceRangeStart = mapData[1],
            rangeSize = mapData[2],
            sourceRange = [ sourceRangeStart, sourceRangeStart + rangeSize - 1 ],
            destinationRange = [ destinationRangeStart, destinationRangeStart + rangeSize - 1 ]

            expandedMap.push([ sourceRange, destinationRange ])
        })
        // Add the 2d array to expandedMapList
        expandedMapList.push(expandedMap)
    })

    let lowesetLocationNumber = 0
    seedList.forEach(seedRange => {
        console.log(seedRange)
        for (let seedIndex = 0; seedIndex < seedRange[1] - seedRange[0]; seedIndex++) {
            let num = seedRange[0] + seedIndex
            expandedMapList.forEach((map, mapIndex) => {
                // map -> range sets -> source and destination ranges -> start and end points of range
                // Default case
                let destination = num
                for (const rangeSet of map) {
                    const sourceRange = rangeSet[0]
                    const sourceRangeStart = sourceRange[0]
                    const sourceRangeEnd = sourceRange[1]
                    const destinationRangeStart = rangeSet[1][0]
                    if (sourceRangeStart <= num && num <= sourceRangeEnd) {
                        destination = destinationRangeStart + (num - sourceRangeStart)
                        break
                    }
                }
                num = destination
                if (mapIndex === steps.length - 1 && (lowesetLocationNumber > destination || lowesetLocationNumber === 0)) lowesetLocationNumber = destination
            })
        }
    })

    console.info(lowesetLocationNumber)
})