import { readFile } from 'node:fs/promises'

const testcase = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`

type LightIndicators = ('.' | '#')[]
type ButtonWiring = number[]
type JoltageReq = number[]
type Machine = [l: LightIndicators, ...ButtonWiring, j: JoltageReq]

function ToggleLights(lights: LightIndicators, button: ButtonWiring): LightIndicators {
    const result = [...lights]
    for (const wire of button) {
        result[wire] = result[wire] === '.' ? '#' : '.'
    }
    return result
}

function BFS_Lights(currentLights: LightIndicators[], buttons: ButtonWiring[], correctLighting: String, currentLevel = 0): number {
    // Base case
    if (currentLights.find(lights => lights.join('') === correctLighting)) return currentLevel

    const nextLevel: LightIndicators[] = []
    for (const setOfLights of currentLights) {
        for (const button of buttons) {
            const newSetofLights = ToggleLights(setOfLights, button)
            if (nextLevel.find(l => l.join('') === newSetofLights.join('')) === undefined) {
                nextLevel.push(newSetofLights)
            }
        }
    }

    return BFS_Lights(nextLevel, buttons, correctLighting, ++currentLevel)
}

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const machines: Machine[] = data.trim().replace(/\r/g, '').split('\n').map(line => line.split(' ').map(part => part.substring(1, part.length - 1)).map(s => s.includes('#') ? s.split('') : s.split(',').map(Number))) as Machine[]

    let sumOfMinButtonPresses = 0

    for (const machine of machines) {
        machine.pop() // We don't care about joltage requirement for part 1
        const requiredLights = machine.shift() as LightIndicators
        const buttons = machine as ButtonWiring[] // Last items remaining will be buttons
        const currLights: LightIndicators = new Array(requiredLights.length).fill('.')
        const minButtonPresses = BFS_Lights([currLights], buttons, requiredLights.join(''))
        sumOfMinButtonPresses += minButtonPresses
    }

    return sumOfMinButtonPresses
}

console.log(await main())