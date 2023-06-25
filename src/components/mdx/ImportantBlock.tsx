import React from "react"
import styled from "styled-components"

const Container = styled.div`
  border: 1px solid var(--color-regex-dark-3);
  padding: 20px;
  position: relative;
  border-radius: 10px;
  height: max-content;
  margin-bottom: 20px;

  .label {
    position: absolute;
    top: -12px;
    font-size: 14px;
    background-color: var(--color-regex);
    padding: 5px 10px;
    border-radius: 10px;
    color: var(--color-regex-dark);
  }

  p {
    margin: 0;
  }
`

export default function ImportantBlock({ children }) {
  return (
    <Container>
      <span className="label">Important</span>
      {children}
    </Container>
  )
}
