import handleCharacterClass from "./handlers/characterclass"
import handleMetaChar from "./handlers/metacharacters"

export default function explainRegex(str: string): string {
  const strItems = str.split("")
  let currentLabel: "characterclass" | "metacharacter" | "normal" | "none" =
    "none"

  try {
    let explanation = ""

    let position = 0

    while (position < strItems.length) {
      const char = strItems[position]

      if (char === "\\") {
        // this should be a metacharacter
        const handle = handleMetaChar(str, position)
        currentLabel = "metacharacter"

        position = handle.newPosition
        explanation += `${handle.explanation}`
      } else if (char === "[") {
        // this should be a character class
        const handle = handleCharacterClass(str, position)
        currentLabel = "characterclass"

        position = handle.newPosition
        explanation += `<br/><br/>${handle.explanation}`
      } else {
        // handle other characters
        console.log(currentLabel)

        explanation +=
          currentLabel === "normal"
            ? `, ${char}`
            : `${position ? "<br/><br/>followed by" : "Begins with"} ${char}`

        currentLabel = "normal"
      }

      position++
    }

    return explanation
  } catch (err) {
    return err.message
  }
}
