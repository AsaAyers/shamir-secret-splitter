import * as shamir from 'shamir'
import { randomBytes } from 'crypto'
import { Secret, Part, MinimumPart } from './types'

export function split(secret: Secret): Part[] {
  const utf8Encoder = new TextEncoder();
  let secretBytes = utf8Encoder.encode(secret.text);

  const uintParts = shamir.split(randomBytes, secret.numParts, secret.quorum, secretBytes);

  return Object.entries(uintParts).map(([key, uint]): Part => {
    return {
      label: secret.label,
      numParts: secret.numParts,
      quorum: secret.quorum,
      index: Number(key),
      hex: Buffer.from(uint).toString('hex')
    }
  })
}

export function join(parts: MinimumPart[]): Secret['text'] {
  const uintParts = parts
    .reduce((obj, p) => {
      obj[p.index] = Uint8Array.from(Buffer.from(p.hex, 'hex'))
      return obj
    }, {} as Record<string, Uint8Array>)
  const utf8Decoder = new TextDecoder();

  const bytes = shamir.join(uintParts)

  return utf8Decoder.decode(bytes)
}
