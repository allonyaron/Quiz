import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const Results = props => {
  const correctAnswers = props.location.state.questions.filter(question => {
    if (question.user_answer === "correct") {
      return true;
    } else {
      return false;
    }
  });

  return (
    <Fragment>
      <div className="score-result">
        You Scored {correctAnswers.length} /{" "}
        {props.location.state.questions.length}
      </div>
      <ul>
        {props.location.state.questions.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                backgroundColor:
                  item.user_answer === "correct" ? "lightgreen" : "pink"
              }}
            >
              {ReactHtmlParser(item.question)}
              <div className="answer">
                Correct Answer: {item.correct_answer}
              </div>
            </li>
          );
        })}
      </ul>
      <Link to="/">
        <button>Play Again</button>
      </Link>
    </Fragment>
  );
};
export default Results;
