import { readFile } from 'fs/promises'

const testcase = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

async function Main() {
    const [ rules, updates ] = (await readFile('./input.txt', { encoding: 'utf-8' })).trim().replace(/\r/g, '').split('\n\n').map(s => s.split('\n').map(s2 => s2.split(s2.includes('|') ? '|' : ',').map(Number)))
    console.log(updates.length + ' updates found')
    let correctlyOrderedUpdates = []
    for await (const update of updates) {
        console.log(`Checking update ${update.join()}`)
        let isCorrect = true
        for (let i = 0; i < update.length; i++) {
            const currPage = update[i]
            const rulesForCurrPage = rules.filter(ruleSet => ruleSet[0] === currPage)
            console.log(`Page ${currPage} has the following rules: ${rulesForCurrPage.map(s => s.join('|')).join()}`)
            let isCurrUpdateCorrect = true
            for (const [_, otherPage] of rulesForCurrPage) {
                const otherPageIndex = update.findIndex(page => page === otherPage)
                console.log(`${otherPage} has index ${otherPageIndex}`)
                if (i > otherPageIndex && otherPageIndex > -1) {
                    isCurrUpdateCorrect = false
                    break
                }
            }
            if (!isCurrUpdateCorrect) {
                isCorrect = false
                break
            }
        }
        if (isCorrect) correctlyOrderedUpdates.push(update)
    }
    console.log(correctlyOrderedUpdates)
    return correctlyOrderedUpdates.reduce((total, update) =>  total + update[Math.floor(update.length / 2)], 0)
}

Main().then(console.log).catch(e => { throw e })