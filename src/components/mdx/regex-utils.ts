const encode = str => encodeURIComponent(str)

export const getUrlString = (
  location: Location,
  input: string,
  pattern: string,
  withoutOrigin: boolean = false
): string => {
  return `${withoutOrigin ? "" : location.origin}/regex?input=${encode(
    `"${input}"`
  )}&pattern=${encode(`${pattern}`)}`
}
