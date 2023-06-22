import React, { useEffect, useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #282a36;
  border-radius: 10px;
  border-top-left-radius: 0px;
  margin: 40px 0 30px;
  position: relative;
  color: white;
  width: 100%;

  .pattern-block,
  .input-block {
    padding: 15px;
    display: flex;
    width: 100%;

    &__label {
      font-size: 16px;
      margin-right: 20px;
      color: #979ecd;
      width: 60px;
      position: relative;
      top: 12px;
    }

    &__string {
      border: 1px solid transparent;
      line-height: 25px;
      font-family: "Roboto Mono";
      font-size: 18px;
    }

    &__input {
      background: none;
      border: 1px solid #4a4d61;
      color: white;
      flex: 1;
      width: 100%;
      /* min-width: 100%; */
      max-width: 100%;
    }

    &__string,
    &__input {
      margin: 0;
      padding: 10px;
      min-height: 25px;
    }
  }

  .pattern-block {
    border-bottom: 1px solid #4a4d61;
    /* padding-bottom: 10px; */
    color: var(--color-regex);
  }

  .input-block {
    /* padding-top: 10px; */
  }

  /* input {
  } */

  .block-top {
    position: absolute;
    top: -25px;
    left: 0;
    display: flex;

    button {
      background-color: #131419;
      border: 1px solid #282a36;
      padding: 5px;
      font-size: 12px;
      padding: 10px;
      width: 60px;
      text-align: center;
      color: white;

      &.match-btn {
        background-color: var(--color-regex);
        color: #131419;
      }
    }

    .invalid-text {
      border: 1px solid #282a36;
      display: block;
      background-color: #f43b3b;
      font-weight: 600;
      font-size: 14px;
      color: white;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .match {
    font-weight: 600;
    position: relative;
    background-color: #2c5c2c;
    padding: 1px;
    border-radius: 2px;
  }
`

export default function RegexBlock({ pattern, input }) {
  const [editingString, setEditingString] = useState(false)
  const [patternInput, setPatternInput] = useState(pattern)
  const [stringInput, setStringInput] = useState(input)
  const [invalidRegex, setInvalidRegex] = useState(false)
  const [modifiedString, setModifiedString] = useState("")

  const findMatches = () => {
    try {
      const regexRegex = /\/(.*)\/(\w+)?/

      const [, patternAsString, flags] = patternInput.match(regexRegex)

      const regexPattern = new RegExp(patternAsString, flags)

      const newModifiedString = stringInput
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

      if (invalidRegex) setInvalidRegex(false)
      setEditingString(false)
    } catch (e) {
      if (!invalidRegex) setInvalidRegex(true)
    }
  }

  useEffect(() => {
    findMatches()
  }, [])

  return (
    <Container>
      <div className="pattern-block">
        <span className="pattern-block__label">Regex</span>
        {!editingString ? (
          <span className="pattern-block__string">{patternInput}</span>
        ) : (
          <input
            className="pattern-block__input"
            value={patternInput}
            // onBlur={findMatches}
            onChange={e => setPatternInput(e.target.value)}
          />
        )}
      </div>
      <div className="input-block">
        <span className="input-block__label">Input</span>

        {!editingString ? (
          <span
            className="input-block__string"
            dangerouslySetInnerHTML={{ __html: modifiedString }}
          />
        ) : (
          <textarea
            className="input-block__input"
            value={stringInput}
            // onBlur={findMatches}
            onChange={e => setStringInput(e.target.value)}
          />
        )}
      </div>
      <div className="block-top">
        {editingString ? (
          <button className="match-btn" onClick={findMatches}>
            Match
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setEditingString(true)}>
            Edit
          </button>
        )}
        {invalidRegex && (
          <span className="invalid-text">Invalid Regex pattern</span>
        )}
      </div>
    </Container>
  )
}
