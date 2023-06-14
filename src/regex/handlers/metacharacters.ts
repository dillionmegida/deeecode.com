const META_CHARACTERS = {
  "\\d": {
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    desc: "a digit meta character, which represents digits from 0 to 9",
  },
}

type ReturnValue = {
  explanation: string
  newPosition: number
}

export default function handleMetaChar(
  str: string,
  position: number
): ReturnValue {
  let dupPosition = position

  const strItems = str.split("")

  const char = str[dupPosition]
  dupPosition++
  const nextChar = strItems[dupPosition]

  if (nextChar === undefined) throw new Error("Expect a character after '\\'")

  const metaChar = `${char}${nextChar}`

  return {
    explanation: `${position ? "followed by" : "Begins with"} ${
      META_CHARACTERS[metaChar].desc
    }`,
    newPosition: dupPosition,
  }
}
