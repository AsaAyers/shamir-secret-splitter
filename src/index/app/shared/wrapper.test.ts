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
    shares: 6,
    threshold: 4,
  }

  const parts = split(secret)
  expect(parts.length).toBe(secret.shares)

  while (parts.length > secret.threshold) {
    parts.splice(Math.floor(Math.random() * parts.length), 1);
  }

  const actual = join(parts)
  expect(actual).toBe(secret.text)
})
