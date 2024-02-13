// https://adventofcode.com/2023/day/3
const FS = require('node:fs')

const input = FS.readFileSync('input.txt', 'utf8')

const inputTest = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

const findPartSum = (input) => {
  const lines = input.split('\n').filter(l => !!l)

  let allBlocks = []

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]
    const prevLine = lines[li - 1]
    const nextLine = lines[li + 1]

    const foundNumbers = [...line.matchAll(/[0-9]+/g)]

    const blocks = foundNumbers.map(foundNumber => {
      const numberIndex = foundNumber.index
      const numberLength = foundNumber[0].length

      const searchStart = numberIndex > 0 ? numberIndex-1 : 0

      const leftAndRight = (line[searchStart] ?? '') + (line[numberIndex+numberLength] ?? '')
      const top = prevLine ? prevLine.slice(searchStart, numberIndex+numberLength+1) : ''
      const bottom = nextLine ? nextLine.slice(searchStart, numberIndex+numberLength+1) : ''
      const symbolSearch = (leftAndRight + top + bottom).replaceAll('.', '').replaceAll(/[0-9]/g, '')

      return [parseInt(foundNumber[0]), symbolSearch]
    })

    allBlocks = allBlocks.concat(blocks)
  }

  const parts = allBlocks.filter(block => !!block[1].length)

  return parts.reduce((a, c) => a + c[0], 0)
}

const findGearRatios = (input) => {
  const lines = input.split('\n').filter(l => !!l)

  const numberMatrix = {}
  const stars = []

  for (let row = 0; row < lines.length; row++) {
    const line = lines[row]

    const foundNumbers = [...line.matchAll(/[0-9]+/g)]
    foundNumbers.forEach((found, index) => {
      const numberValue = found[0]
      const numberId = `${row}.${index}`
      for (let col = found.index; col < (found.index + numberValue.length); col++) {
        const pos = `${row}.${col}`
        numberMatrix[pos] = {value: numberValue, id: numberId}
      }
    })

    const foundStars = [...line.matchAll(/\*/g)].forEach(found => {
      const symbolIndex = found.index
      const symbolLength = found[0].length

      const star = {
        pos: `${symbolIndex}.${row}`,
        numberPositions: []
      }

      const searchStart = symbolIndex > 0 ? symbolIndex-1 : 0
      const searchEnd = symbolIndex+symbolLength+1 <= line.length ? symbolIndex+symbolLength+1 : line.length

      const numberRegex = /[0-9]/

      for (let col = searchStart; col < searchEnd; col++) {
        if (numberRegex.test(lines[row-1][col])) {
          star.numberPositions.push(`${row-1}.${col}`)
        }
        if (numberRegex.test(lines[row][col])) {
          star.numberPositions.push(`${row}.${col}`)
        }
        if (numberRegex.test(lines[row+1][col])) {
          star.numberPositions.push(`${row+1}.${col}`)
        }
      }

      stars.push(star)
    })
  }

  const gearRatios = stars
    .map(star => {
      const starNumbers = []
      const addedIds = []
      for (let index = 0; index < star.numberPositions.length; index++) {
        const starNumberPosition = star.numberPositions[index]
        const number = numberMatrix[starNumberPosition]
        if (!addedIds.includes(number.id)) {
          addedIds.push(number.id)
          starNumbers.push(number.value)
        }
      }
      return starNumbers
    })
    .filter(uniqueStarNumbers => uniqueStarNumbers.length > 1)
    .reduce((sum, uniqueStarNumbers) => {
      const ratio = uniqueStarNumbers.reduce((a, v) => a * parseInt(v), 1)
      return sum + ratio
    }, 0)

  return gearRatios
}

const output1Test = findPartSum(inputTest)
const output1Expect = 4361
if (output1Test !== output1Expect) {
  throw new Error(`test 1 failed: expected ${output1Expect} got ${output1Test}`)
}
const output1 = findPartSum(input)
console.log(output1)

const output2Test = findGearRatios(inputTest)
const output2Expect = 467835
if (output2Test !== output2Expect) {
  throw new Error(`test 2 failed: expected ${output2Expect} got ${output2Test}`)
}
const output2 = findGearRatios(input)
console.log(output2)
