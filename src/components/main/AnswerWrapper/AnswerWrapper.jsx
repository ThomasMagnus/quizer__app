import React from 'react'
import AnswersList from "../answers/AnswersList";

class AnswerWrapper extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        // console.log(this.props.questions[this.props.quiz.numberQuestion])
        return (
            <>
                <h1 className="main__title">Ответьте на все вопросы</h1>
                <div className="wrapper">
                    <div className="wrapper__quiz">
                        <span className="main__question">
                            <strong>{this.props.quiz.numberQuestion + 1}.</strong>&nbsp;
                            {this.props.questions[this.props.quiz.numberQuestion].questions}
                        </span>
                        <small className="quiz-count">{this.props.quiz.numberQuestion + 1} из {this.props.questions.length}</small>
                    </div>
                    <AnswersList
                        item={this.props.item}
                        quiz={this.props.quiz}
                        questions = {this.props.questions}
                        handler={this.props.handler}
                        count={this.props.quiz.numberQuestion}
                        state={this.props.quiz.answerColor}
                        answersArr={this.props.answersArr}
                        yourAnswersArr = {this.props.yourAnswersArr}/>
                </div>
            </>
        )
    }
}

export default AnswerWrapper
