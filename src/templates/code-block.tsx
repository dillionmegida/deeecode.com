import React from "react"
import { Highlight, themes } from "prism-react-renderer"
import styled from "styled-components"

const Container = styled.div`
  margin-bottom: 10px;
  .block {
    padding: 20px 20px 5px;
    border-radius: 5px;

    span {
      display: inline-block;
      margin-bottom: 5px;
    }
  }
`

export default function CodeBlock({ children, className }) {
    console.log(className)
  const language = className?.replace(/language-/, "") || ""

  return (
    <Container>
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
    </Container>
  )
}
