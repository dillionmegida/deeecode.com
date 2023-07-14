import classNames from "classnames"
import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  border: 1px solid var(--color-javascript-dark-3);
  border-radius: 10px;
  height: max-content;
  margin-bottom: 30px;
  position: relative;

  .click-label {
    position: absolute;
    border: 1px solid var(--color-javascript-dark-3);
    background-color: #282a36;
    display: block;
    padding: 3px 8px;
    font-size: 14px;
    top: -15px;
    left: 15px;
  }

  code {
    background-color: var(--color-javascript-dark-3);
    padding: 2px 4px;
    border-radius: 5px;
    font-family: "Roboto Mono";
  }

  .question {
    display: block;
    padding: 15px;
    background-color: var(--color-javascript-dark-2);
    line-height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .answers-list {
    padding: 0;
    margin: 0;
    list-style: none;
    counter-set: answer-item;
  }

  .answer-item {
    counter-increment: answer-item;
    margin: 0;
    position: relative;

    button {
      transition: background-color 300ms;
      padding: 20px 15px;
      color: white;
      padding-left: 20px;
      text-align: left;
      border: 1px solid var(--color-javascript-dark-2);
      width: 100%;
      background: none;

      &::before {
        content: counter(answer-item) ".";
        width: 20px;
        margin-right: 20px;
      }

      &:not(:disabled):hover {
        background-color: var(--color-javascript-dark-2);
      }
    }

    &--correct,
    &--failed {
      button::after {
        content: "";
        position: absolute;
        width: 0;
        top: 0;
        left: 0;
        height: 100%;
        transition: width 500ms;
      }
    }

    &--correct button::after {
      background-color: #90ee9054;
    }

    &--failed button::after {
      background-color: #ee909053;
    }
  }

  .answer-item--selected {
    .answer-item--correct,
    .answer-item--failed {
      button::after {
        width: 100%;
      }
    }
  }
`

export default function QuestionBlock({ question, answers, answer }) {
  const [selected, setSelected] = useState(0)

  const isDisabled = selected !== 0

  const onSelect = id => {
    setSelected(id)
  }

  return (
    <Container>
      <span className="click-label">Click the right answer 🤔</span>
      <span
        className="question"
        dangerouslySetInnerHTML={{
          __html: question.replace(/<code>/g, '<code class="inline-code">'),
        }}
      />
      <ol
        className={classNames("answers-list", {
          "answer-item--selected": selected !== 0,
        })}
      >
        {answers.map((a, i) => {
          const answerId = i + 1

          return (
            <li
              className={classNames("answer-item", {
                "answer-item--correct": answerId === answer,
                "answer-item--failed":
                  selected === answerId &&
                  selected !== 0 &&
                  selected !== answer,
              })}
            >
              <button disabled={isDisabled} onClick={() => onSelect(answerId)}>
                {a}
              </button>
            </li>
          )
        })}
      </ol>
    </Container>
  )
}
