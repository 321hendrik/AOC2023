// https://adventofcode.com/2023/day/4
const FS = require('node:fs')

const rawInput = FS.readFileSync('input.txt', 'utf8')

const rawInputTest = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

const parseCardNumber = (str) => {
  const numbers = []
  let trimmed = str.slice(1)
  while (trimmed.length) {
    numbers.push(trimmed.slice(0,2).trim())
    trimmed = trimmed.slice(3)
  }
  return numbers
}

const getCardInfo = cardLine => {
  const cardParts = [
    cardLine.split(':')[0].slice(5),
    cardLine.split(':')[1].split('|'),
  ]
  return {
    id: parseInt(cardParts[0], 10) - 1,
    winningNumbers: parseCardNumber(cardParts[1][0]),
    playedNumbers: parseCardNumber(cardParts[1][1])
  }
}

const getWinsForCard = (card) => {
  return card.playedNumbers.filter(playedNumber => card.winningNumbers.includes(playedNumber))
}

const findAnswer1 = (input) => {
  const cards = input.map(cardLine => getCardInfo(cardLine))
  const cardsWithWins = cards.
    reduce((winCards, card, index) => {
      const wins = getWinsForCard(card)
      if (wins?.length > 0) {
        card.wins = wins
        card.points = Math.pow(2, wins.length - 1)
        return winCards.concat([card])
      }
      return winCards
    }, [])
  const pilePoints = cardsWithWins.reduce((sum, card) => sum + card.points, 0)
  return pilePoints
}

const recurseSumCards = (card, index, allCards) => {
  const cardWinNumber = card.wins.length
  if (!cardWinNumber) {
    return 1
  }
  const nextCards = allCards.slice(card.id + 1, card.id + 1 + cardWinNumber)
  return nextCards.reduce((sum, card, index) => recurseSumCards(card, index, allCards) + sum, 1)
}

const findAnswer2 = (input) => {
  const cards = input
    .map(cardLine => getCardInfo(cardLine))
    .map(card => ({
      ...card,
      wins: getWinsForCard(card)
    }))
    .map(recurseSumCards)
  return cards.reduce((a, c) => a + c, 0)
}

const input = rawInput.split('\n').filter(l => !!l)
const inputTest = rawInputTest.split('\n').filter(l => !!l)

const output1Test = findAnswer1(inputTest)
const output1Expect = 13
if (output1Test !== output1Expect) {
  throw new Error(`test 1 failed: expected ${output1Expect} got ${output1Test}`)
}
const output1 = findAnswer1(input)
console.log(output1)

const output2Test = findAnswer2(inputTest)
const output2Expect = 30
if (output2Test !== output2Expect) {
  throw new Error(`test 2 failed: expected ${output2Expect} got ${output2Test}`)
}
const output2 = findAnswer2(input)
console.log(output2)
