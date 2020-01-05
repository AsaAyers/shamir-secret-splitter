import wordlist from 'pgp-word-list/pgp.json'

export function hexToWords(hex: string): string[] {
  const buffer = Buffer.from(hex.toLowerCase().replace(/[^0-9a-f]+/g, ''), 'hex')

  const words: string[] = []
  for (let i = 0; i < buffer.length; i++) {
    const value = buffer[i]
    words.push(
      wordlist[value][i % 2]
    )
  }

  return words
}


type ReverseWordList = [
  Record<string, number>,
  Record<string, number>,
]

let reverseWordslist: ReverseWordList


export function wordsToHex(input: string): string | null {
  if (reverseWordslist == null) {
    reverseWordslist = [{}, {}]
    for (let i = 0; i < wordlist.length; i++) {
      const [even, odd] = wordlist[i]

      reverseWordslist[0][even.toLowerCase()] = i
      reverseWordslist[1][odd.toLowerCase()] = i
    }
  }

  const words = input.trim().toLowerCase().split(/\s+/g)
  if (input.trim().length === 0) {
    return ''
  }

  const values = []
  for (let i = 0; i < words.length; i++) {
    const word = words[i]

    const tmp = reverseWordslist[i % 2][word]
    if (tmp == null) {
      return null
    }
    values.push(tmp)
  }

  return new Buffer(values).toString('hex').toUpperCase()
}
