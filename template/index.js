const FS = require('node:fs')

const rawInput = FS.readFileSync('input.txt', 'utf8')

const rawInputTest = `

`

const findAnswer1 = (input) => {
  return 0
}

const findAnswer2 = (input) => {
  return 0
}

const input = rawInput.split('\n').filter(l => !!l)
const inputTest = rawInputTest.split('\n').filter(l => !!l)

const output1Test = findAnswer1(inputTest)
const output1Expect = 0
if (output1Test !== output1Expect) {
  throw new Error(`test 1 failed: expected ${output1Expect} got ${output1Test}`)
}
const output1 = findAnswer1(input)
console.log(output1)

const output2Test = findAnswer2(inputTest)
const output2Expect = 0
if (output2Test !== output2Expect) {
  throw new Error(`test 2 failed: expected ${output2Expect} got ${output2Test}`)
}
const output2 = findAnswer2(input)
console.log(output2)
