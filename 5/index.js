// https://adventofcode.com/2023/day/5
const FS = require('node:fs')

const rawInput = FS.readFileSync('input.txt', 'utf8')

const rawInputTest = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

const compose = (fns) => value => fns.reduce((acc, fn) => fn(acc), value)

const transform = maps => value => {
  for (let index = 0; index < maps.length; index++) {
    const map = maps[index]
    const rangeWidth = map[2]
    const inputRangeStart = map[1]
    const inputRangeEnd = inputRangeStart + rangeWidth - 1
    const inRange = value >= inputRangeStart && value <= inputRangeEnd
    if (inRange) {
      const startOffset = value - inputRangeStart
      const outputRangeStart = map[0]
      const transformedNumber = outputRangeStart + startOffset
      return transformedNumber
    }
  }
  return value
}

const parseInput = (input) => {
  const sections = input.split('\n\n').map(l => {
    const [key, values] = l.split(':').map(f => f.trim())
    const lines = values.split('\n')
      .map(l => l.trim().split(' ').map(e => parseInt(e, 10)))
    return [key.replaceAll('-', '_').replaceAll(' map', ''), lines]
  })
  return Object.fromEntries(sections)
}

const findAnswer1 = (input) => {
  const {
    seeds,
    seed_to_soil,
    soil_to_fertilizer,
    fertilizer_to_water,
    water_to_light,
    light_to_temperature,
    temperature_to_humidity,
    humidity_to_location
  } = parseInput(input)

  const toSoil = transform(seed_to_soil)
  const toFertilizer = transform(soil_to_fertilizer)
  const toWater = transform(fertilizer_to_water)
  const toLight = transform(water_to_light)
  const toTemperature = transform(light_to_temperature)
  const toHumidity = transform(temperature_to_humidity)
  const toLocation = transform(humidity_to_location)

  const getLocationForSeed = compose([ toSoil, toFertilizer, toWater, toLight, toTemperature, toHumidity, toLocation ])

  const locations = seeds[0].map(seed => getLocationForSeed(seed))

  return Math.min(...locations)
}

const runForSeeds = (info, fn) => {
  let curr = [...info]
  let lowestLocation = null
  while (curr.length) {
    const [start, range, ...rest] = curr
    for (let index = start; index < (start + range); index++) {
      const location = fn(index)
      if (!lowestLocation || location < lowestLocation) {
        lowestLocation = location
      }
    }
    curr = rest
  }
  return lowestLocation
}

const findAnswer2 = (input) => {
  const {
    seeds,
    seed_to_soil,
    soil_to_fertilizer,
    fertilizer_to_water,
    water_to_light,
    light_to_temperature,
    temperature_to_humidity,
    humidity_to_location
  } = parseInput(input)

  const toSoil = transform(seed_to_soil)
  const toFertilizer = transform(soil_to_fertilizer)
  const toWater = transform(fertilizer_to_water)
  const toLight = transform(water_to_light)
  const toTemperature = transform(light_to_temperature)
  const toHumidity = transform(temperature_to_humidity)
  const toLocation = transform(humidity_to_location)

  const getLocationForSeed = compose([ toSoil, toFertilizer, toWater, toLight, toTemperature, toHumidity, toLocation ])

  const lowestLocation = runForSeeds(seeds[0], getLocationForSeed)

  return lowestLocation
}

const input = rawInput
const inputTest = rawInputTest

const output1Test = findAnswer1(inputTest)
const output1Expect = 35
if (output1Test !== output1Expect) {
  throw new Error(`test 1 failed: expected ${output1Expect} got ${output1Test}`)
}
const output1 = findAnswer1(input)
console.log(output1)

const output2Test = findAnswer2(inputTest)
const output2Expect = 46
if (output2Test !== output2Expect) {
  throw new Error(`test 2 failed: expected ${output2Expect} got ${output2Test}`)
}
// const output2 = findAnswer2(input)// took 443.65s
// console.log(output2)
