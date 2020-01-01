
declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module 'shamir' {

  function randomBytes(n: number): Uint8Array {

  }

  export function split(
    rand: typeof randomBytes,
    n: number,
    k: number,
    secret: Uint8Array
  ): Record<string, Uint8Array> { }

  export function join(
    parts: Record<string, Uint8Array>
  ): UInt8Array { }

}
