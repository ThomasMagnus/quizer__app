import React, {Component} from 'react'
import './App.css';
import Main from "./components/main/Main";
import Quiz from "./components/main/quiz/Quiz";
import Menu from "./components/menu/Menu";
import Layout from "./components/layout/Layout";
import Authorisaton from "./components/menu/Authorisation/Authorisaton";
import {Route} from "react-router-dom";
import MainItem from "./components/menu/QuizItem/MainItem";
import QuizCreator from "./components/menu/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";
import getData from "./components/sevices/getData";

class App extends Component{
    constructor(props) {
        super(props);
        this.rightAnswers = [];
        this.yourAnswersArr = [];
        this.checkAnswer = [];
        this.url = 'https://quizapp-667c6.firebaseio.com/quizApp.json'
    }

    menu = {
        lists: [
            // {
            //     label: 'Тест',
            //     to: '/test',
            //     exact: true
            // },
            {
                label: 'Главная',
                to: '/',
                exact: true
            },
            {
                label: 'Аторизация',
                to: '/authorisation',
                exact: true
            },
            {
                label: 'Список тестов',
                to: '/quizList',
                exact: true
            },
            {
                label: 'Создание теста',
                to: '/quizCreator',
                exact: true
            }
        ]
    }

    state = {
        quiz: [
            {
                questions: '',
                firstAnswer: [
                    {text: '', id: 1},
                    {text: '', id: 2},
                    {text: '', id: 3},
                    {text: '', id: 4},
                ],
                rightAnswerId: 2,
                quizId: '',
            },

        ],
        numberQuestion: 0,
        rightAnswerCounter: 0,
        answerColor: '',
        endQuiz: false,
        quizLen: false,
    }

    getTimer = (quizLen) => {
        const timeout = window.setTimeout(() => {
            if (this.state.numberQuestion + 1 < quizLen.length) {
                this.setState({numberQuestion: this.state.numberQuestion + 1})
                this.setState({answerColor: ''})
            } else {
                this.setState({endQuiz: true})
            }

            clearTimeout(timeout)
        }, 1000)
    }

    answerHandler = (answerId, rightId, quizLen) => {
        if (answerId === rightId) {
            this.setState({answerColor: {[answerId]: ' success'}})
            this.getTimer(quizLen)
            this.checkAnswer.push('fa fa-check')
            this.setState({rightAnswerCounter: this.state.rightAnswerCounter + 1})
        } else {
            this.setState({answerColor: {[answerId]: ' fail'}})
            this.getTimer(quizLen)
            this.checkAnswer.push('fa fa-times')
        }
        this.rightAnswers.push(this.state.quiz[this.state.numberQuestion].questions)
    }

    tryAgain = () => {
        this.setState({endQuiz: false})
        this.setState({numberQuestion: 0})
        this.setState({rightAnswerCounter: 0})
        this.setState({answerColor: ''})
        this.rightAnswers = [];
        this.yourAnswersArr = [];
        this.checkAnswer = [];
    }

    componentDidMount() {
        this.burger = document.querySelector('.menu__wrapper');
        this.layout = document.querySelector('.layout');
        this.menuList = document.querySelector('.menu__list');
        this.menuLine = document.querySelectorAll('.menu__line');
        this.quizLink = document.querySelectorAll('.quiz__link');
        getData(this.url)
            .then(response => {
                const quiz = []
                try {
                    Object.values(response).forEach((item, i) => {
                        item.forEach(object => {
                            quiz.push({
                                questions: object.question,
                                quizId: Object.keys(response)[i],
                                firstAnswer: [
                                    {text: object.answers.answer1.value, id: +object.answers.answer1.id},
                                    {text: object.answers.answer2.value, id: +object.answers.answer2.id},
                                    {text: object.answers.answer3.value, id: +object.answers.answer3.id},
                                    {text: object.answers.answer4.value, id: +object.answers.answer4.id},
                                ],
                                rightAnswerId: object.rightId
                            })
                        })
                    })
                    this.setState({quiz})
                    quiz.length > 0 ? this.setState({quizLen: true}) : this.setState({quizLen: false})
                } catch (e) {}
            })
    }

    getMenu = () => {
        this.menuLine.forEach(item => item.classList.toggle('line'))
        this.menuList.classList.toggle('active__menu')
        this.layout.classList.toggle('active__layout')
        this.burger.classList.toggle('active__burger')
    }

    render() {
        return (
            <>
                <div className="App">
                    <Layout menu={this.menu} handle={this.getMenu}/>
                    <Main>
                        <Menu handle={this.getMenu}/>
                            <Route path={"/quiz/"}>
                                <Quiz
                                    quiz={this.state}
                                    questions = {this.state.quiz}
                                    handler={this.answerHandler}
                                    endQuiz={this.state.endQuiz}
                                    answersArr={this.rightAnswers}
                                    yourAnswersArr={this.yourAnswersArr}
                                    checkAnswer={this.checkAnswer}
                                    rightAnswerCounter={this.state.rightAnswerCounter}
                                    tryAgain={this.tryAgain}
                                    quizLen={this.state.quizLen}/>
                            </Route>
                    </Main>
                </div>
                <Route path='/authorisation' component={Authorisaton}/>
                <Route path='/quizCreator' component={QuizCreator}/>
                <Route path='/quizList' component={QuizList}/>
                <Route path='/' component={MainItem} exact/>
            </>
        );
    }
}

export default App;
