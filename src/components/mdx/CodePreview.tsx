import React, { useState } from "react"
import styled from "styled-components"
import { Highlight, themes } from "prism-react-renderer"
import CodeBlock from "./CodeBlock"
import classNames from "classnames"

const Container = styled.div`
  border: 1px solid;
  border-color: color-mix(in srgb, var(--main-color) 80%, white);
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  overflow: hidden;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .code-section {
    padding: 10px;

    .code-block {
      cursor: pointer;
      position: relative;

      &.code-block--active::after {
        content: "";
        background-color: #2cb08636;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .code-block:not(:last-child) {
      margin-bottom: 10px;
    }

    .block {
      padding: 10px;
      overflow-x: auto;
    }
  }

  .preview-section {
    background-color: white;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
    min-height: 100px;
  }
`

export default function CodePreview({ stylesArray }) {
  const [activeCode, setActiveCode] = useState(stylesArray[0])

  return (
    <Container>
      <div className="code-section">
        {stylesArray.map(style => (
          <div
            onClick={() => activeCode.id !== style.id && setActiveCode(style)}
            className={classNames("code-block", {
              "code-block--active": activeCode.id === style.id,
            })}
          >
            <CodeBlock
              children={style.code.trim()}
              className={`language-${style.type}`}
            />
          </div>
        ))}
      </div>
      <div className="preview-section">
        <div>
          <style
            scoped
            dangerouslySetInnerHTML={{
              __html: activeCode.code,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: activeCode.others,
            }}
          />
        </div>
      </div>
    </Container>
  )
}
