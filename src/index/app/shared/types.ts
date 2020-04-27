
export type Secret = {
  label: string,
  text: string,
  shares: number,
  threshold: number,
}

export type MinimumPart = {
  index: number,
  hex: string,
}

export type Part = MinimumPart & {
  label: Secret['label'],
  shares: Secret['shares'],
  threshold: Secret['threshold'],
}
