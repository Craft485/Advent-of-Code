import { readFile } from 'fs'

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    const lines = inputData.replace(/\r/g, '').split('\n').filter(Boolean),
    instructions = lines.shift().split('').map(v => v === 'L' ? 0 : 1),
    nodeMap = lines.map(node => node.split(' = ').map((v, i) => i % 2 !== 0 ? v.replace(/\(|,|\)/g, '').split(' ') : v))

    let steps = 0, currentNode = 'AAA'
    while (currentNode !== 'ZZZ') {
        for (let i = 0; i < instructions.length; i++) {
            currentNode = nodeMap.find(v => v[0] === currentNode)[1][instructions[i]]
            steps++
            if (currentNode === 'ZZZ') break
        }
    }
    console.info(steps)
})