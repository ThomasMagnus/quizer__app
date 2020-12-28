import React from "react";
import {Link} from "react-router-dom";
import './quizList.css'
import {connect} from 'react-redux'
import { fetchQuizes } from "../../redux/actions/quiz";

class QuizList extends React.Component{
    constructor(props) {
        super(props);
        this.url = 'https://quizapp-667c6.firebaseio.com/quizApp.json'
    }

    async componentDidMount() {
        this.props.fetchQuizes()
    }

    renderQuizList() {
        return (
            this.props.quizArr.map((item, i) => {
                return (
                    <li className="quiz__item" key={item}>
                        <Link className="quiz__link" to={"/quiz/" + item}>Тест №{i + 1}</Link>
                    </li>
                )
            })
        )
    }

    render() {
        return (
            <div className="list__container">
                {!this.props.loader ?
                    <img src="./img/loader.svg" alt="loader"/> :
                    this.props.quizArr.length === 0 ? <h1>Пока нет ни одного теста</h1>
                    : <ul className="quiz__list">
                        {this.renderQuizList()}
                      </ul>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quizArr: state.quiz.quizArr,
        loader: state.quiz.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
