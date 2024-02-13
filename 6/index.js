// https://adventofcode.com/2023/day/6
const FS = require('node:fs')

const rawInput = FS.readFileSync('input.txt', 'utf8')

const rawInputTest = `
Time:      7  15   30
Distance:  9  40  200
`

function calculateWaysToWin(raceTime, recordDistance) {
  let waysToWin = 0

  if (recordDistance <= raceTime) {
    // You cannot beat the record if the record distance is less than or equal to race time
    return waysToWin
  }

  for (let holdTime = 1; holdTime < raceTime; holdTime++) {
    let remainingTime = raceTime - holdTime;
    if (remainingTime >= 0 && ((remainingTime * holdTime) > recordDistance)) {
      waysToWin++
    }
  }

  return waysToWin
}

const parseInput = (input) => {
  const lines = input.split('\n').filter(l => !!l)
  const [times, distances] = lines.map(l => l.split(':')[1].split(' ').map(e => e.trim()).filter(e => !!e))
  return times.map((e, i) => [parseInt(e), parseInt(distances[i])])
}

const findAnswer1 = (input) => {
  const ways = input.map(r => calculateWaysToWin(r[0], r[1]))
  return ways.reduce((a, w) => a * w, 1)
}

const findAnswer2 = (input) => {
  const race = input.reduce((a, r) => [a[0] + r[0], a[1] + r[1]], ['', '']).map(e => parseInt(e))
  const ways = calculateWaysToWin(race[0], race[1])
}

const input = parseInput(rawInput)
const inputTest = parseInput(rawInputTest)

const output1Test = findAnswer1(inputTest)
const output1Expect = 288
if (output1Test !== output1Expect) {
  throw new Error(`test 1 failed: expected ${output1Expect} got ${output1Test}`)
}
const output1 = findAnswer1(input)
console.log(output1)

const output2Test = findAnswer2(inputTest)
const output2Expect = 71503
if (output2Test !== output2Expect) {
  throw new Error(`test 2 failed: expected ${output2Expect} got ${output2Test}`)
}
// const output2 = findAnswer2(input)
// console.log(output2)
