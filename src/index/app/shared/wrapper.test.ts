import { split, join } from './wrapper'
import { Secret } from './types'

test('TextEncoder polyfill', () => {
  const input = 'Hello World'
  const bytes = new TextEncoder().encode(input)

  const output = new TextDecoder().decode(bytes)
  expect(output).toBe(input)
})

test('wrapper can split and combine a secret', () => {
  const secret: Secret = {
    label: "Test Secret",
    text: `Password: ${Math.random()}`,
    numParts: 6,
    quorum: 4,
  }

  const parts = split(secret)
  expect(parts.length).toBe(secret.numParts)

  while (parts.length > secret.quorum) {
    parts.splice(Math.floor(Math.random() * parts.length), 1);
  }

  const actual = join(parts)
  expect(actual).toBe(secret.text)
})
