// Day 5: If You Give A Seed A Fertilizer - This one is really strange and has a long explanation: https://adventofcode.com/2023/day/5

import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    // Parse input data
    const almanac = inputData.replace(/\r/g, '').split('\n\n').map(s => s.trim()).filter(Boolean),
    seedList = almanac.shift().replace('seeds: ', '').split(' ').map(Number),
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
    expandedMapList = [],
    finalMap = {}

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

    // Populate finalMap
    seedList.forEach(seed => {
        let num = seed
        finalMap[seed] = {}
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
            finalMap[seed][steps[mapIndex]] = destination
            num = destination
        })
    })

    const locationData = new Array(Object.keys(finalMap).length).fill(0).map((x, i) => Object.values(finalMap)[i]['location']).sort((a, b) => a - b)

    // console.log(finalMap)
    // console.log(locationData)
    console.info(locationData[0])
})