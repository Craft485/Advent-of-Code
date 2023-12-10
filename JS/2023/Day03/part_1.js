/**
 * Add up all the part numbers in the engine schematic (puzzle input)
 * Any number adjacent to a symbol, even diagonally, is a "part number" and should be included in the sum.
 * 
 * (Periods (.) do not count as a symbol.)
 */

import { readFile, writeFile } from 'fs'

const symbols = '@#$%&/*-+='.split('')

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    let result = 0
    /** @type number[] */
    let partNumbers = []

    // Parse input data
    /** @type string[] */
    const lines = inputData.replaceAll('\r', '').split('\n').filter(Boolean)
    // console.log(lines)
    lines.forEach((line, lineIndex) => {
        /** @type string */
        let currentPartNumber = ''
        let currentPartNumberIsValid = false

        line.split('').forEach((char, charIndex) => {
            if (/^[0-9]$/.test(char)) {
                currentPartNumber += char
                
                const charBehindIndex = charIndex >= 0 ? charIndex - 1 : null,
                charFrontIndex = charIndex + 1 < line.length ? charIndex + 1 : null,
                charAboveIndex = lineIndex - 1 >= 0 ? lineIndex - 1 : null,
                charBelowIndex = lineIndex + 1 < lines.length ? lineIndex + 1 : null

                // Create list of all eight neighboring characters and filter out ones that don't exist
                const neighbors = [
                    charBehindIndex !== null ? line[charBehindIndex] : null,
                    charFrontIndex !== null ? line[charFrontIndex] : null,
                    charAboveIndex !== null ? lines[charAboveIndex][charIndex] : null,
                    charBelowIndex !== null ? lines[charBelowIndex][charIndex] : null,
                    charBehindIndex !== null && charAboveIndex !== null ? lines[charAboveIndex][charBehindIndex] : null,
                    charBehindIndex !== null && charBelowIndex !== null ? lines[charBelowIndex][charBehindIndex] : null,
                    charFrontIndex !== null && charAboveIndex !== null ? lines[charAboveIndex][charFrontIndex] : null,
                    charFrontIndex !== null && charBelowIndex !== null ? lines[charBelowIndex][charFrontIndex] : null
                ].filter(Boolean)

                // See if there is overlap between neighbors and symbols
                const intersections = neighbors.filter(x => symbols.includes(x))
                console.log(`Found ${intersections.length} intersections with neighbors | ${currentPartNumber}`)

                if (intersections.length > 0) {
                    currentPartNumberIsValid = true
                    console.log('Found valid part number')
                }
            } else {
                if (currentPartNumberIsValid) {
                    partNumbers.push(parseInt(currentPartNumber))
                    result += parseInt(currentPartNumber)
                    currentPartNumberIsValid = false
                }
                currentPartNumber = ''
            }
        })
        // Catch any edge cases where a valid part number is found at the end of a line
        if (currentPartNumberIsValid) {
            partNumbers.push(parseInt(currentPartNumber))
            result += parseInt(currentPartNumber)
            currentPartNumberIsValid = false
        }
        currentPartNumber = ''
    })
    // writeFile('debug.log', `[${partNumbers.toString()}]`, err => { if (err) throw err })
    console.log(partNumbers)
    console.log(`Found ${partNumbers.length} part numbers`)
    console.info(result)
})