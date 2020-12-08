import React, {Component} from 'react'
import './quiz.css'
import AnswerWrapper from "../AnswerWrapper/AnswerWrapper";
import EndQuiz from "../EndQuiz/EndQuiz";

class Quiz extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.quizer = []
    }

    state = {
        quizArr: []
    }

    // componentDidMount() {
    //     this.quizer = []
    //     this.props.quiz.quiz.forEach(item => {
    //         if (item.quizId === window.location.pathname.split('/')[2]) {
    //             console.log(item)
    //             this.quizer.push(item)
    //         }
    //     })
    // }

    getQuizes = () => {
        this.quizer = []
        this.props.quiz.quiz.forEach(item => {
            if (item.quizId === window.location.pathname.split('/')[2]) {
                console.log(item)
                this.quizer.push(item)
            }
        })
    }


    render() {
        this.getQuizes()
        return (
            <div className="main__quiz">
                {!this.props.quizLen ? <h1>Нет ни одного теста</h1> : this.props.endQuiz ? <EndQuiz
                                        answersArr={this.props.answersArr}
                                        yourAnswersArr={this.props.yourAnswersArr}
                                        quiz={this.quizer}
                                        checkAnswer={this.props.checkAnswer}
                                        rightAnswerCounter={this.props.rightAnswerCounter}
                                        tryAgain={this.props.tryAgain}/>
                :
                    <AnswerWrapper
                        quiz={this.props.quiz}
                        questions={this.quizer}
                        handler={this.props.handler}
                        answersArr={this.props.answersArr}
                        yourAnswersArr={this.props.yourAnswersArr}/>

                }
            </div>
        )
    }
}

export default Quiz
