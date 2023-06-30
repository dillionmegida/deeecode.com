const encode = str => encodeURIComponent(str)

export const getUrlString = (
  location: Location,
  input: string,
  pattern: string
): string => {
  return `${location.origin}/regex?input=${encode(
    `"${input}"`
  )}&pattern=${encode(`${pattern}`)}`
}
