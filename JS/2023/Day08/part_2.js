import { readFile } from 'fs'

function gcd(a, b) {
    // Euclidean algorithm
    while (b !== 0) {
        const temp = b
        b = a % b
        a = temp
    }
    return a
}

function lcm(a, b) {
    return (a * b / gcd(a, b))
}

function lcmm(args) {
    if(args.length == 2){
        return lcm(args[0], args[1])
    } else {
        var arg0 = args[0]
        args.shift()
        return lcm(arg0, lcmm(args))
    }
}

readFile('input.txt', { encoding: 'utf-8' }, (err, inputData) => {
    if (err) throw err

    const lines = inputData.replace(/\r/g, '').split('\n').filter(Boolean),
    instructions = lines.shift().split('').map(v => v === 'L' ? 0 : 1),
    nodeMap = lines.map(node => node.split(' = ').map((v, i) => i % 2 !== 0 ? v.replace(/\(|,|\)/g, '').split(' ') : v)),
    starterNodes = nodeMap.filter(x => x[0].endsWith('A'))
    let steps = 0, currentNodes = starterNodes, finalStepCounts = []
    while (finalStepCounts.length < starterNodes.length) {
        for (let i = 0; i < instructions.length; i++) {
            steps++
            const newNodes = []
            currentNodes.forEach(node => {
                const nextNode = nodeMap.find(v => v[0] === node[1][instructions[i]])
                // If the nextNode is an endpoint for this path, then save the current step count, otherwise, continue the path
                nextNode[0].endsWith('Z') ? finalStepCounts.push(steps) : newNodes.push(nextNode)
            })
            currentNodes = newNodes
            // An early break case in the event that we are in the middle of reading instructions and we reach the end
            if (finalStepCounts.length === starterNodes.length) break
        }
    }
    console.info(lcmm(finalStepCounts))
})