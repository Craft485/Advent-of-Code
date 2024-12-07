import { readFile } from 'fs/promises'

const testCase = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

async function Main() {
    const input = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n').map(line => line.split(': ')).map(line => [Number(line[0]), line[1].split(' ').map(Number)])
    let totalSum = 0
    for (const line of input) {
        /** @type {[testValue: number, values: number[]]} */
        const [ testValue, values ] = line
        /**
         * @param {number} x 
         * @param {number[]} nums 
         * @returns {number[]}
         */
        function permutations(x, nums) {
            return nums.length ? [
                ...permutations(x + nums[0], nums.slice(1)),
                ...permutations(x * nums[0], nums.slice(1)),
                ...permutations(Number(`${x}${nums[0]}`), nums.slice(1))
            ] : [x]
        }
        if (permutations(values[0], values.slice(1)).includes(testValue)) totalSum += testValue
    }
    return totalSum
}

Main().then(console.log).catch(e => { throw e })