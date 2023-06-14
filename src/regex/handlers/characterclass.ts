export default function handleCharacterClass(str: string, position: number) {
  let dupPosition = position
  let strItems = str.split("")

  const char = strItems[dupPosition]
  const nextChar = strItems[dupPosition + 1]

  let explanation = position ? "followed by either " : "Begins with "

  const checkForClosingBracketRegex = /[^\]]+\]/
  const restOfTheString = str.substring(dupPosition + 1)

  if (nextChar === "]") {
    throw new Error("Character class cannot be empty")
  }

  if (!checkForClosingBracketRegex.test(restOfTheString)) {
    // then there is no closing bracket
    throw new Error("Character class does not have a closing bracket")
  }

  dupPosition++

  while (dupPosition < strItems.length) {
    if (strItems[dupPosition] === "]")
        break;

    explanation += `${strItems[dupPosition]}`
    const nextAfterThis = strItems[dupPosition + 1]

    if (nextAfterThis !== undefined && nextAfterThis !== "]")
      explanation += " or "

    dupPosition++
  }

  return { explanation, newPosition: dupPosition }
}
