import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import QuestionCard from "./QuestionCard";

class Quiz extends Component {
  state = {
    questions: [],
    currentQuestionIndex: 0,
    numOfQuestions: 10
  };

  async componentDidMount() {
    let response = await fetch(
      `https://opentdb.com/api.php?amount=${
        this.state.numOfQuestions
      }&difficulty=hard&type=boolean`
    );
    let data = await response.json();
    this.setState({ questions: data.results });
  }

  handleClick = answerValue => {
    this.setState({
      questions: [
        ...this.state.questions.slice(0, this.state.currentQuestionIndex),
        Object.assign(
          {},
          this.state.questions[this.state.currentQuestionIndex],
          {
            user_answer:
              answerValue ===
              this.state.questions[this.state.currentQuestionIndex]
                .correct_answer
                ? "correct"
                : "incorrect"
          }
        ),
        ...this.state.questions.slice(this.state.currentQuestionIndex + 1)
      ],
      currentQuestionIndex: this.state.currentQuestionIndex + 1
    });
  };

  render() {
    if (this.state.currentQuestionIndex === this.state.numOfQuestions) {
      return (
        <Redirect
          to={{
            pathname: "/results",
            state: { questions: this.state.questions }
          }}
        />
      );
    }
    return (
      <Fragment>
        {this.state.questions.length ? (
          <QuestionCard
            {...this.state.questions[this.state.currentQuestionIndex]}
            currentQuestionNum={this.state.currentQuestionIndex + 1}
            numOfQuestions={this.state.numOfQuestions}
            handleClick={this.handleClick}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Fragment>
    );
  }
}

export default Quiz;
