import React from "react"
import { Highlight, themes } from "prism-react-renderer"
import styled from "styled-components"

const Inline = styled.span<{ theme }>`
  padding: 4px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 5px;
`

const Multiline = styled.div`
  margin-bottom: 20px;

  .block {
    padding: 25px 40px 0 20px;
    border-radius: 5px;
    width: 100%;
    overflow-x: auto;
    line-height: 30px;
  }
`

export default function CodeBlock({
  children,
  className,
  category = "regular",
}) {
  const language = className?.replace(/language-/, "") || ""

  const inline = !className

  if (inline)
    return <Inline theme={{ bg: `var(--color-${category}-dark-3)` }}>{children}</Inline>

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
