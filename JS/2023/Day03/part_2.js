/**
 * A gear is any * symbol that is adjacent to exactly two part numbers.
 * Its gear ratio is the result of multiplying those two numbers together.
 * 
 * This time, you need to find the gear ratio of every gear and add them all up.
 */

import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    let result = 0

    // Parse input data
    /** @type string[] */
    const lines = inputData.replaceAll('\r', '').split('\n').filter(Boolean)

    lines.forEach((line, lineIndex) => {
        line.split('').forEach((char, charIndex) => {
            if (char === '*') {
                const charBehindIndex = charIndex >= 0 ? charIndex - 1 : null,
                charFrontIndex = charIndex + 1 < line.length ? charIndex + 1 : null,
                lineAboveIndex = lineIndex - 1 >= 0 ? lineIndex - 1 : null,
                lineBelowIndex = lineIndex + 1 < lines.length ? lineIndex + 1 : null,
                lineBelow = lines[lineBelowIndex],
                lineAbove = lines[lineAboveIndex]
                
                let sections = []

                // Section above current character | slice takes a section of a string using the interval [a, b)
                let sectionAbove = lineAbove?.slice(charBehindIndex, charFrontIndex + 1)
                if (sectionAbove) {
                    const n1 = []
                    const n2 = []
                    if (!isNaN(Number(sectionAbove[0]))) {
                        let counter = charBehindIndex - 1
                        while (counter >= 0) {
                            if (!isNaN(Number(lineAbove[counter]))) {
                                n1.push(lineAbove[counter])
                                counter--
                            } else break
                        }
                    }
                    if (!isNaN(Number(sectionAbove.at(-1)))) {
                        let counter = charFrontIndex + 1
                        while (counter < line.length) {
                            if (!isNaN(Number(lineAbove[counter]))) {
                                n2.push(lineAbove[counter])
                                counter++
                            } else break
                        }
                    }
                    sectionAbove = n1.reverse().join('') + sectionAbove + n2.join('')
                    if (/\d+\.\d+/.test(sectionAbove)) {sections.push([sectionAbove.split('.')[0], sectionAbove.split('.')[1]])} else sections.push(sectionAbove.replaceAll('.', ''))
                }
                // console.log(sectionAbove)

                // Section below current character
                let sectionBelow = lineBelow?.slice(charBehindIndex, charFrontIndex + 1)
                if (sectionBelow) {
                    const n1 = []
                    const n2 = []
                    if (!isNaN(Number(sectionBelow[0]))) {
                        let counter = charBehindIndex - 1
                        while (counter >= 0) {
                            if (!isNaN(Number(lineBelow[counter]))) {
                                n1.push(lineBelow[counter])
                                counter--
                            } else break
                        }
                    }
                    if (!isNaN(Number(sectionBelow.at(-1)))) {
                        let counter = charFrontIndex + 1
                        while (counter < line.length) {
                            if (!isNaN(Number(lineBelow[counter]))) {
                                n2.push(lineBelow[counter])
                                counter++
                            } else break
                        }
                    }
                    sectionBelow = n1.reverse().join('') + sectionBelow + n2.join('')
                    if (/\d+\.\d+/.test(sectionBelow)) {sections.push([sectionBelow.split('.')[0], sectionBelow.split('.')[1]])} else sections.push(sectionBelow.replaceAll('.', ''))
                }
                // console.log(sectionBelow)

                // Section to the left (behind) of the current character
                let sectionBehind = line[charBehindIndex]
                if (sectionBehind) {
                    const n = []
                    if (!isNaN(Number(sectionBehind))) {
                        let counter = charBehindIndex - 1
                        while (counter >= 0) {
                            if (!isNaN(Number(line[counter]))) {
                                n.push(line[counter])
                                counter--
                            } else break
                        }
                    }
                    sectionBehind = n.reverse().join('') + sectionBehind
                    sections.push(sectionBehind.replaceAll('.', ''))
                }
                // console.log(sectionBehind)

                // Section to right (front) of the current character
                let sectionFront = line[charFrontIndex]
                if (sectionFront) {
                    const n = []
                    if (!isNaN(Number(sectionFront))) {
                        let counter = charFrontIndex + 1
                        while (counter < line.length) {
                            if (!isNaN(Number(line[counter]))) {
                                n.push(line[counter])
                                counter++
                            } else break
                        }
                    }
                    sectionFront = sectionFront + n.join('')
                    sections.push(sectionFront.replaceAll('.', ''))
                }
                // console.log(sectionFront)

                sections = sections.flat().filter(Boolean).map(Number)
                // console.log(sections)

                if (sections.length === 2) result += eval(sections.join('*'))
            }
        })
    })

    console.info(result)
})