// https://adventofcode.com/2023/day/1
const FS = require('node:fs')

const numberWords = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'zero': 0,
  'null': 0,
}

const input = FS.readFileSync('input.txt', 'utf8')

const replaceWordsFromStart = (line) => {
  const foundWords = Object.entries(numberWords)
    .map(([k, v]) => [line.indexOf(k), k, v])
    .filter(([index]) => index > -1)
    .sort((a, b) => a[0] - b[0])

  if (!foundWords.length) {
    return line
  }
  const firstWord = foundWords[0]
  return replaceWordsFromStart(`${line.slice(0, firstWord[0])}${firstWord[2]}${line.slice((firstWord[1].length - 1) + firstWord[0])}`)
}

const cleaned = input
  .split('\n')
  .filter(line => !!line)
  .map((line) => line.toLocaleLowerCase())
  .map(replaceWordsFromStart)
  .map((line) => line.replaceAll(/[^0-9]/g, ''))
  .map((line) => `${line.at(0)}${line.at(-1)}`)
  .map((line) => parseInt(line, 10))
  .map(e => {
    console.log(e)
    return e
  })
  .reduce((sum, number) => sum + number, 0)

console.log(cleaned)
