import {sizeOfRoot, fileSystem} from './Part1.js'

const currentlyUnusedSpace = 70000000 - sizeOfRoot
const spaceNeededToBeFreed = 30000000 - currentlyUnusedSpace
let sizeOfSmallestDirToDelete = 0

function findDirSizes(dir) {
    let finalSize = dir.sizeOfAllFilesInDir || 0
    for (const entry in dir) {
        if (typeof dir[entry] !== 'number') {
            const dirSize = findDirSizes(dir[entry])
            finalSize += dirSize
        }
    }
    if (finalSize >= spaceNeededToBeFreed && (finalSize < sizeOfSmallestDirToDelete || !sizeOfSmallestDirToDelete)) sizeOfSmallestDirToDelete = finalSize
    return finalSize
}

findDirSizes(fileSystem)

console.log(sizeOfSmallestDirToDelete)