import { useEffect, useState } from "react"

export default function useRegex({ input, pattern, type = "match" }) {
  const [modifiedString, setModifiedString] = useState("")
  const [patternState, setPatternState] = useState(pattern)
  const [inputState, setInputState] = useState(input)
  const [invalidRegex, setInvalidRegex] = useState("")
  const [editingMode, setEditingMode] = useState(input === "" || pattern === "")

//   const is_dev = process.env.NODE_ENV !== "development"
  const is_dev = false

  const findMatches = () => {
    if (input === "" && pattern === "") return

    try {
      const regexRegex = /\/(.*)\/(\w+)?/

      const [, patternAsString, flags] = (
        is_dev ? pattern : patternState
      ).match(regexRegex)

      const regexPattern = new RegExp(patternAsString, flags)

      const newModifiedString = (is_dev ? input : inputState)
        .replace(regexPattern, match => {
          if (match.includes("\n")) {
            return match.replace(
              /.+/g,
              brokenMatch =>
                `<span class="match">${brokenMatch.replace(
                  /\s/g,
                  "&nbsp;"
                )}</span>`
            )
          } else {
            return `<span class="match">${match
              .replace(/\n/g, "<br/>")
              .replace(/\s/g, "&nbsp;")}</span>`
          }
        })
        .replace(/\n/g, "<br/>")

      setModifiedString(newModifiedString)

      if (invalidRegex) setInvalidRegex("")
      setEditingMode(false)
    } catch (e) {
      console.log(e)
      if (!invalidRegex) setInvalidRegex("Invalid Regex pattern")
    }
  }

  const validate = () => {
    if (input === "" && pattern === "") return

    try {
      const regexRegex = /\/(.*)\/(\w+)?/

      const [, patternAsString, flags] = (
        is_dev ? pattern : patternState
      ).match(regexRegex)

      const regexPattern = new RegExp(`^${patternAsString}$`, flags)

      const isValid = regexPattern.test(is_dev ? input : inputState)

      const newModifiedString = isValid
        ? `<span class="match">${is_dev ? input : inputState}</span>`
        : `<span>${is_dev ? input : inputState}</span>`

      setModifiedString(newModifiedString)

      setEditingMode(false)

      if (!isValid)
        return setInvalidRegex("The pattern does not match this string")

      if (invalidRegex) setInvalidRegex("")
    } catch (err) {
      setInvalidRegex("The pattern does not match this string")
    }
  }

  useEffect(() => {
    if (inputState !== "" && patternState !== "") {
      if (type === "match") findMatches()
      else validate()
    }
  }, [])

  //   useEffect(() => {
  //     if (input !== "" && pattern !== "") {
  //       setInputState(input)
  //       setPatternState(pattern)

  //       setEditingMode(false)
  //       setInvalidRegex("")
  //     }
  //   }, [input, pattern])

  //   useEffect(() => {
  //     if (inputState !== "" && patternState !== "") {
  //       if (type === "match") findMatches()
  //       else validate()
  //     }
  //   }, [input, pattern])

  return {
    modifiedString,
    invalidRegex,
    editingMode,
    setEditingMode,
    setPatternState,
    setInputState,
    pattern: is_dev ? pattern : patternState,
    input: is_dev ? input : inputState,
    findMatches,
    validate,
  }
}




// /[A-Z]+\$/gi

// Also @⁨💜⁩ I need your help here as I never too strong with regex 
// “type: textContent|5654$5812$7$ABCDEFGHIJK$"

// So here what i need i want to get the ABCDEFGHIJK from this string 
// 😢

// @⁨Isreal Odogwu⁩