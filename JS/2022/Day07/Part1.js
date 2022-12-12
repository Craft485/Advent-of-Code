import fs from 'fs'

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' })
const lines  = input.split('\r\n')
// Remove cd to /
lines.shift()

const fileSystem = {}

let parentDir = null
let currentDir = fileSystem
let path = ''

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    console.log(`${i + 1} | ${line}`)
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
                parentDir = dirsInPath.pop()
                // Update path
                // doesn't work because currentDir is an object reference to somewhere within fileSystem
                path = dirsInPath.join('/') + `${path.includes('/') ? '/' : ''}${currentDir}`
            } else {
                parentDir = currentDir
                path += `${path.includes('/') ? '/' : ''}${newDir}`
                // Update currentDir
                const dirs = path.split('/')
                console.log(path)
                let reference = fileSystem
                console.log(dirs)
                for (const dir of dirs) {
                    console.log(dir)
                    console.log(reference['gqcclj'])
                    reference = reference[dir]
                }
                currentDir = reference
            }
        } else if (parts[0] === 'ls') {
            // Look ahead and capture all the lines that don't begin with $
            const output = []
            for (let n = 1; n < lines.length; n++) {
                if (!lines[i + n].startsWith('$')) {
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
                    if (!currentDir[dirName]) {
                        currentDir[dirName] = {}
                    }
                }
            }
            if(!currentDir.sizeOfAllFilesInDir) Object.defineProperty(currentDir, 'sizeOfAllFilesInDir', { value: sizeOfAllFilesInDir, enumerable: false })
        }
    }
}

// Try using a recursive function to search each directory to get their full size(including sub dirs)
// dirSizesTotal will NOT be the size of root as dirs whose size is over 100 000 will not be included
let dirSizesTotal = 0
let sizeOfRoot = 0

function recurse(dir) {
    // return the size of this directory(just files) plus the size of any sub directories
    let finalSize = dir.sizeOfAllFilesInDir || 0
    for (const entry in dir) {
        if (typeof dir[entry] !== 'number') {
            const dirSize = recurse(dir[entry])
            if (dirSize <= 100000) finalSize += dirSize
        }
    }
    return finalSize
}

// Loop done specifically for root, byproduct will also be the sum of the subdirs stored into dirSizesTotal
for (const entry in fileSystem) {
    sizeOfRoot += fileSystem.sizeOfAllFilesInDir
    if (typeof fileSystem[entry] !== 'number') {
        const size = recurse(fileSystem[entry])
        sizeOfRoot += size
    }
}

console.log(`dirSizesTotal(no root): ${dirSizesTotal}\nroot: ${sizeOfRoot}`)