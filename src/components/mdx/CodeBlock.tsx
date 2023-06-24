import React from "react"
import { Highlight, themes } from "prism-react-renderer"
import styled from "styled-components"

const Inline = styled.span<{ theme }>`
  padding: 4px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 5px;
  font-family: "Roboto Mono";
`

const Multiline = styled.div`
  margin-bottom: 20px;
  font-family: "Roboto Mono";

  .block {
    padding: 25px 40px 0 20px;
    border-radius: 5px;
    width: 100%;
    overflow-x: auto;
    line-height: 30px;
  }

  .inline-highlight {
    font-weight: 600;
    position: relative;
    background-color: #2c5c2c;
    padding: 1px;
    border-radius: 2px;
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
    return (
      <Inline
        className="inline-code"
        theme={{ bg: `var(--color-${category}-dark-3)` }}
      >
        {children}
      </Inline>
    )

  return (
    <Multiline className="multiline-code">
      <Highlight theme={themes.dracula} code={children} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="block" style={{ ...style }}>
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index })
              return (
                <div key={index} {...lineProps}>
                  {line.map((token, key, i) => {
                    if (
                      (token.content.includes("<hi>") ||
                        token.content.includes("``")) &&
                      token.types.includes("plain")
                    ) {
                      return (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: token.content
                              .replace(
                                /``.*?``/g,
                                match =>
                                  `<span class='inline-highlight'>${match.substring(2, match.length - 2)}</span>`
                              )
                              .replace(
                                /<hi>/g,
                                `<span class='inline-highlight'>`
                              )
                              .replace(/<\/hi>/g, "</span>"),
                          }}
                        />
                      )
                    }

                    return <span key={key} {...getTokenProps({ token, key })} />
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </Multiline>
  )
}
