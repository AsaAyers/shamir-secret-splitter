
export type Secret = {
  label: string,
  text: string,
  numParts: number,
  quorum: number,
}

export type MinimumPart = {
  index: number,
  hex: string,
}

export type Part = MinimumPart & {
  label: Secret['label'],
  numParts: Secret['numParts'],
  quorum: Secret['quorum'],
}
