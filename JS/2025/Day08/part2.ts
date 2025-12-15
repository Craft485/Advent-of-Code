import { readFile } from 'node:fs/promises'

const testcase = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`

type BoxPosition = [x: number, y: number, z: number]

async function main() {
    const data = await readFile('./input.txt', { encoding: 'utf-8' })
    const boxes: BoxPosition[] = data.trim().replace(/\r/g, '').split('\n').map(line => line.split(',').map(Number)) as BoxPosition[]
    const circuits: Array<Set<number>> = new Array(boxes.length).fill(null).map((_, i) => new Set([i]))

    // Find all possible connections
    const connections: number[][] = []
    for (let i = 0; i < boxes.length - 1; i++) {
        const p1 = boxes[i]
        for (let j = i + 1; j < boxes.length; j++) {
            const p2 = boxes[j]
            // Square distance is easier for computers to calculate, and we aren't actually concerned with the true distance between points
            const sq_dist = (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2
            connections.push([i, j, sq_dist])
        }
    }
    // Sort connections in ascending order by square distance
    connections.sort((a, b) => a[2] - b[2])

    // Use the connections to build the circuits
    const shortestConnections = connections
    // X components of the last points used to create complete circuit
    let x1 = -1
    let x2 = -1
    for (const connection of shortestConnections) {
        const [p1, p2] = connection // Yes I'm re-using variable names, deal with it
        // Each circuit is treated as being built from a single point
        // this means we will be building the same circuit multiple times, but thats ok (dupes will get filtered out later)
        // basically, check to see if the circuit starting from one point is missing the other, if so we need to union the two circuits together
        if (!circuits[p1].has(p2)) {
            circuits[p2].forEach(box => {
                circuits[p1].add(box) // A poor mans union, a regular union could be used but we want to loop over the items anyways
                // Because of pass by reference, this set will be updated in the future if we add anything more
                // this allows us to only focus on the Sets being built from the points we are currently looking at,
                // and don't need to loop through and update all other Sets that are building off of this circuit
                // This assignment probably isn't always needed, but the cost to have it is negligible 
                circuits[box] = circuits[p1]
            })
        }
        // If the circuit we just looked has the same number of items as there are boxes, we've made a complete circuit (we're done)
        // technically, we could just return instead of setting outer variables and breaking, but I typically don't like returning from a function while inside a loop
        if (circuits[p1].size === boxes.length) {
            x1 = boxes[p1][0]
            x2 = boxes[p2][0]
            break
        }
    }
    
    return x1 * x2
}

console.log(await main())