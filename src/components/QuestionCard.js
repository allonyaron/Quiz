import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";

const QuestionCard = props => {
  return (
    <Fragment>
      <div className="category">Category: {props.category}</div>
      <div className="question">{ReactHtmlParser(props.question)}</div>
      <div>
        {props.currentQuestionNum} of {props.numOfQuestions}
      </div>
      <div className="button-container">
        <button onClick={() => props.handleClick("True")}>true</button>
        <button onClick={() => props.handleClick("False")}>false</button>
      </div>
    </Fragment>
  );
};

export default QuestionCard;
