import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const Results = (props) => {
    console.log(props.location.state.questions)
    return (
        <Fragment>
        <div>CORRECT</div>
        {props.location.state.questions.filter(question => {
            if (question.user_answer === "correct") return true
        }).map(item => {
            return <div> {item.question}</div>
        })}

        <div>INCORRECT</div>
        {props.location.state.questions.filter(question => {
            if (question.user_answer === "incorrect") return true
        }).map(item => {
            return <div> {item.question}</div>
        })}
        <Link to="/"><button>Play Again</button></Link> 
        </Fragment>
    )
}
export default Results; 