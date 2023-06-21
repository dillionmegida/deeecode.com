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
    display: inline-block;
    position: relative;

    &::before {
      content: "";
      background-color: #57f657;
      position: absolute;
      left: -3px;
      border-radius: 2px;
      z-index: 0;
      opacity: .2;
      width:calc(100% + 6px);
      height: 80%;
      top: 4px;
    }
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
                      token.content.includes("<hi>") &&
                      token.types.includes("plain")
                    ) {
                      return (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: token.content
                              .replace(
                                /<hi>/g,
                                `<span class='inline-highlight'>`
                              )
                              .replace(/<\/hi>/, "</span>"),
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
