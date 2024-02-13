// https://adventofcode.com/2023/day/2
const FS = require('node:fs')

const input = FS.readFileSync('input.txt', 'utf8')

// 12 red cubes, 13 green cubes, and 14 blue cubes
const bagLoad = {
  red: 12,
  green: 13,
  blue: 14
}

const isDrawPossible = (draw, bagLoad) => {
  if (draw?.red && draw.red > bagLoad.red) {
    return false
  }
  if (draw?.green && draw.green > bagLoad.green) {
    return false
  }
  if (draw?.blue && draw.blue > bagLoad.blue) {
    return false
  }
  return true
}

const games = input.split('\n')
  .filter(l => !!l)
  .map(line => {
    const [one, two] = line.split(':')
    const gameNo = parseInt(one.slice(5), 10)
    const draws = two.split(';').map(d => Object.fromEntries(d.split(',').map(c => {
      const [count, color] = c.trim().split(' ')
      return [color, parseInt(count)]
    })))
    return {
      id: gameNo,
      draws
    }
  })

 const possible = games.filter(game => {
  return game.draws.filter(draw => !isDrawPossible(draw, bagLoad)).length === 0
 })

const idSum = possible.reduce((a, game) => a + game.id, 0)

const leastCubeSetForGames = games.map(game => game.draws.reduce((minBag, draw) => {
  minBag[0] = minBag[0] < draw.red ? draw.red : minBag[0]
  minBag[1] = minBag[1] < draw.green ? draw.green : minBag[1]
  minBag[2] = minBag[2] < draw.blue ? draw.blue : minBag[2]
  return minBag
}, [0,0,0]))

const minSetScore = leastCubeSetForGames.reduce((acc, set) => acc + (set[0] * set[1] * set[2]), 0)

console.log(games)
