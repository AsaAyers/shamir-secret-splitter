
export type Secret = {
  label: string,
  text: string,
  numParts: number,
  quorum: number,
}

export type Part = {
  label: Secret['label'],
  numParts: Secret['numParts'],
  quorum: Secret['quorum'],
  index: number,
  hex: string,
}
