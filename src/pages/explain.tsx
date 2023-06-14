import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import explainRegex from "../regex/main"

const InputBlock = styled.div`
  input {
    padding: 20px;
    font-size: 40px;
    width: 100%;
  }
`

const Explanation = styled.div`
  margin-top: 20px;
  p {
    color: white;
    font-size: 18px;
  }
`

export default function ExplainRegex() {
  const [input, setInput] = useState("")
  const [explanation, setExplanation] = useState("Enter a pattern")

  useEffect(() => {
    if (input === "" && explanation.length) setExplanation("Enter a pattern")

    if (input === "") return

    setExplanation(explainRegex(input))
  }, [input])

  return (
    <Layout>
      <InputBlock>
        <input value={input} onInput={e => setInput(e.target.value)} />
        {explanation.length && (
          <Explanation>
            <p dangerouslySetInnerHTML={{ __html: explanation }} />
          </Explanation>
        )}
      </InputBlock>
    </Layout>
  )
}
