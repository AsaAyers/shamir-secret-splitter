import { hexToWords, wordsToHex } from './pgp-phrase'

// https://en.wikipedia.org/wiki/PGP_word_list
test('hexToWords', () => {
  const hex = `
  E582 94F2 E9A2 2748 6E8B
  061B 31CC 528F D7FA 3F19
  `

  expect(hexToWords(hex)).toMatchObject(`
    topmost Istanbul Pluto vagabond
    treadmill Pacific brackish dictator
    goldfish Medusa afflict bravado
    chatter revolver Dupont midsummer
    stopwatch whimsical cowbell bottomless
    `.trim().split(/\s+/g))
})

test('wordsToHex', () => {
  expect(wordsToHex(`
    topmost Istanbul Pluto vagabond
    treadmill Pacific brackish dictator
    goldfish Medusa afflict bravado
    chatter revolver Dupont midsummer
    stopwatch whimsical cowbell bottomless
  `)).toBe(`
    E582 94F2 E9A2 2748 6E8B
    061B 31CC 528F D7FA 3F19
  `.replace(/\s+/g, ''))
})

test(`wordsToHex returns an object with the word it didn't find`, () => {
  expect(wordsToHex(`
    topmost Istanbul Pluto vagabond invalid
  `)).toMatchObject({ word: 'invalid' })
})

test(`wordsToHex does not return null on an empty string`, () => {
  expect(wordsToHex('')).toBe('')
})
