import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #282a36;
  border-radius: 10px;
  border-top-left-radius: 0px;
  margin: 15px 0;
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
      margin-top: 10px;
    }

    &__string {
      border: 1px solid transparent;
      display: inline-block;
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

  .controls {
    position: absolute;
    top: -20px;
    left: 0;

    button {
      background-color: #131419;
      border: 1px solid #282a36;
      padding: 5px;
      font-size: 12px;
      padding: 10px;
      width: 60px;
      text-align: center;
      color: white;
    }
  }

  .match {
    font-weight: 600;
    display: inline-block;
    position: relative;

    &::before {
      content: "";
      background-color: #57f657;
      position: absolute;
      left: -3px;
      border-radius: 2px;
      z-index: 0;
      opacity: 0.2;
      width: calc(100% + 6px);
      height: calc(100% + 5px);
      top: -2px;
    }
  }
`

export default function RegexBlock({ pattern, input }) {
  const [editingString, setEditingString] = useState(false)
  const [patternInput, setPatternInput] = useState(pattern)
  const [stringInput, setStringInput] = useState(input)

  const regexRegex = /\/(.*)\/(\w+)?/

  const [, patternAsString, flags] = patternInput.match(regexRegex)

  const regexPattern = new RegExp(patternAsString, flags)

  const modifiedString = editingString
    ? stringInput
    : stringInput.replace(regexPattern, match => {
        return `<span class="match">${match.replace(/\s/, '&nbsp;')}</span>`
      })

  const findMatches = e => {
    setEditingString(false)
  }

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
            value={modifiedString}
            // onBlur={findMatches}
            onChange={e => setStringInput(e.target.value)}
          />
        )}
      </div>
      <div className="controls">
        {editingString ? (
          <button onClick={findMatches}>Match</button>
        ) : (
          <button onClick={() => setEditingString(true)}>Edit</button>
        )}
      </div>
    </Container>
  )
}
