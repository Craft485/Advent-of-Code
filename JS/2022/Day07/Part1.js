import fs from 'fs'

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' })
const lines  = input.split('\r\n')
// Just for fun
console.info(`1 | ${lines[0]}`)
// Remove the first command where we cd to root/home
lines.shift()

export const fileSystem = {}
let parentDir = null
let currentDir = fileSystem
let path = ''

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    console.info(`${i + 2} | ${line}`)
    // If the line we are looking at is a command
    if (line.startsWith('$')) {
        const parts = line.split(' ')
        // Remove the $
        parts.shift()
        if (parts[0] === 'cd') {
            const newDir = parts[1]
            if (newDir === '..') {
                const dirsInPath = path.split('/')
                // Remove currentDir from the path
                dirsInPath.pop()
                currentDir = parentDir
                let systemReference = fileSystem
                for (const dir of dirsInPath) systemReference = systemReference[dir] ? systemReference[dir] : fileSystem
                parentDir = systemReference
                // Update path
                path = dirsInPath.join('/')
            } else {
                parentDir = currentDir
                path += `${path.length > 0 ? '/' : ''}${newDir}`
                // Update currentDir
                const dirs = path.split('/')
                let reference = fileSystem
                for (const dir of dirs) reference = reference[dir]
                currentDir = reference
            }
        } else if (parts[0] === 'ls') {
            // Look ahead and capture all the lines that don't begin with $
            const output = []
            // Really shouldn't use lines#length here but not sure what else to use
            for (let n = 1; n < lines.length; n++) {
                if (!lines[i + n]?.startsWith('$') && lines[i + n] !== undefined) {
                    output.push(lines[i + n])
                } else break
            }
            let sizeOfAllFilesInDir = 0
            for (const entry of output) {
                const parts = entry.split(' ')
                if (parts[0] !== 'dir') {
                    // We found a file in the current directory
                    const size = parts[0]
                    const fileName = parts[1]
                    // If its a new file we haven't seen yet, add it to the current directory
                    if (!currentDir[fileName]) {
                        currentDir[fileName] = parseInt(size)
                        sizeOfAllFilesInDir += parseInt(size)
                    }
                } else {
                    // We found a sub directory in the current directory
                    const dirName = parts[1]
                    // If its a new directory we haven't seen yet, initialize it 
                    if (!currentDir[dirName]) currentDir[dirName] = {}
                }
            }
            if(!currentDir.sizeOfAllFilesInDir) Object.defineProperty(currentDir, 'sizeOfAllFilesInDir', { value: sizeOfAllFilesInDir, enumerable: false })
        }
    }
}

// Log the final system tree
console.log(fileSystem)

// dirSizesTotal will NOT be the size of root as dirs whose size is over 100 000 will not be included
let dirSizesTotal = 0

export function recurse(dir) {
    // Return the size of this directory(just files) plus the size of any sub directories
    let finalSize = dir.sizeOfAllFilesInDir || 0
    for (const entry in dir) {
        if (typeof dir[entry] !== 'number') {
            const dirSize = recurse(dir[entry])
            // For calculating the size of root
            finalSize += dirSize
            if (dirSize <= 100000) dirSizesTotal += dirSize
        }
    }
    Object.defineProperty(dir, 'dirSize', { value: finalSize, enumerable: false })
    return finalSize
}

// Calculate the size of the root directory, byproduct will also be the sum of all directories with total size <= 100k stored into dirSizesTotal
export const sizeOfRoot = recurse(fileSystem)
console.log(`dirSizesTotal(no root): ${dirSizesTotal}\nroot: ${sizeOfRoot}`)