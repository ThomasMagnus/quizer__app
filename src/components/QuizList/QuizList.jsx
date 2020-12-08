import React from "react";
import {Link} from "react-router-dom";
import './quizList.css'
import getData from "../sevices/getData";

class QuizList extends React.Component{
    constructor(props) {
        super(props);
        this.url = 'https://quizapp-667c6.firebaseio.com/quizApp.json'
    }

    state = {
        quizArr: [],
        loader: false
    }

    async componentDidMount() {
        await getData(this.url)
            .then(response => {
                const quizes = []
                Object.keys(response).forEach(item => {
                    quizes.push(item)
                })
                this.setState({quizArr: quizes})
                this.setState({loader: true})
            })
            .catch(error => console.log(error))
    }

    renderQuizList() {
        return (
            this.state.quizArr.map((item, i) => {
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
                {!this.state.loader ?
                    <img src="./img/loader.svg" alt="loader"/> :
                    this.state.quizArr.length === 0 ? <h1>Пока нет ни одного теста</h1>
                    : <ul className="quiz__list">
                        {this.renderQuizList()}
                      </ul>}
            </div>
        )
    }
}

export default QuizList
