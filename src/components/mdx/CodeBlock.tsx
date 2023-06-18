import React from "react"
import { Highlight, themes } from "prism-react-renderer"
import styled from "styled-components"

const Inline = styled.span`
  padding: 4px;
  background-color: var(--color-regex-dark-3);
  border-radius: 5px;
`

const Multiline = styled.div`
  margin-bottom: 20px;

  .block {
    padding: 25px 40px 0 20px;
    border-radius: 5px;
    width: 100%;
    overflow-x: auto;
  }
`

export default function CodeBlock({ children, className }) {
  const language = className?.replace(/language-/, "") || ""

  const inline = !className

  if (inline) return <Inline>{children}</Inline>

  return (
    <Multiline>
      <Highlight theme={themes.dracula} code={children} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="block" style={{ ...style }}>
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index })
              return (
                <div key={index} {...lineProps}>
                  {line.map((token, key, i) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </Multiline>
  )
}
