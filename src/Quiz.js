import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';
import { broserHistory, Redirect } from 'react-router-dom';

class Quiz extends Component {
    state = {
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
    };
  
    async componentDidMount() {
        let response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
        let data = await response.json();
        console.log('fetch')
        console.log(data.results)
        this.setState({questions: data.results})
    }


    handleClick = answerValue => {
      // debugger;
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
                  ? 'correct'
                  : 'incorrect',
            },
          ),
          ...this.state.questions.slice(this.state.currentQuestionIndex + 1),
        ],
      });
      // this.setState({
      //   answers: [
      //     ...this.state.answers,
      //     answerValue ===
      //     this.state.questions[this.state.currentQuestionIndex].correct_answer
      //       ? 'correct'
      //       : 'incorrect',
      //   ],
      // });

      console.log('this.state.currentQuestionIndex ' + this.state.currentQuestionIndex );
      console.log('this.state.questions.length ' + this.state.questions.length );
      this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1});
    };
  
    render() {
        if (this.state.currentQuestionIndex === this.state.questions.length -1)  {
            return (<Redirect to={{
                pathname: '/results',
                state: { questions: this.state.questions}
              }}  />)
        };
      return (
        <div className="App">
          {this.state.questions.length ? 
                <QuestionCard {...this.state.questions[this.state.currentQuestionIndex]} />
                               :
            `Loading...` 
          }
          <button onClick={() => this.handleClick('True')}>true</button>
          <button onClick={() => this.handleClick('False')}>false</button>
        </div>
      );
    }
  }

const QuestionCard = (props) => {
    return (
        <React.Fragment>
            <div>{props.category}</div>
            <div>{ReactHtmlParser(props.question)}</div></React.Fragment>
        
        
    )
}

  export default Quiz;