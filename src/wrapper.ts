import * as shamir from 'shamir'
import { randomBytes } from 'crypto'
import { Secret, Part } from './types'

export function split(secret: Secret): Part[] {

  const utf8Encoder = new TextEncoder();
  // const utf8Decoder = new TextDecoder();
  let secretBytes = utf8Encoder.encode(secret.text);
  // secretBytes = Uint8Array.from(secretBytes)

  const parts = shamir.split(randomBytes, secret.numParts, secret.quorum, secretBytes);

  return Object.entries(parts).map(([key, uint]): Part => {
    return {
      label: secret.label,
      numParts: secret.numParts,
      quorum: secret.quorum,
      index: Number(key),
      hex: Buffer.from(uint).toString('hex')
    }
  })
}
