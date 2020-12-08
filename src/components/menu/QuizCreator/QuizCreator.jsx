import React from 'react'
import './quizCreator.css'
import Input from "../../Input/Input";
import Select from "./Select/Select";
import { postData } from "../../sevices/postData";

class QuizCreator extends React.Component{
    constructor(props) {
        super(props)
        this.quizItem = []
        this.url = 'https://quizapp-667c6.firebaseio.com/quizApp.json'
    }

    componentDidMount() {
        this.inputs = document.querySelectorAll('input')
        this.form = document.querySelector('.quizCreate__form')
        this.inputsArr = []
        this.inputs.forEach(item => this.inputsArr.push(item))
    }

    createInput = (count) => {
        return {
            label: `Введите ответ №${count}`,
            labelClass: 'input__label',
            errorMessage: 'Введите корректный ответ',
            id: count,
            type: 'text',
            require: true,
            class: 'quizCreator__input',
        }
    }

    state = {
        validLang: /[A-Za-z]/g,
        valid: false,
        disabled: true,
        question: {
            label: 'Введите вопрос:',
            errorMessage: 'Введите корректный вопрос!',
        },
        answers: {
            option1: this.createInput(1),
            option2: this.createInput(2),
            option3: this.createInput(3),
            option4: this.createInput(4),
        },
        class: 'disabled',
        rightAnswerId: '',
    }

    resetStateValid = () => {
        this.setState({valid: false})
        this.setState({disabled: true})
    }

    detectQuizObjectValue = () => {
        return this.inputsArr.find(item => {
            return item.value.length === 0
        })
    }

    detectInputsValidate = (input) => {
        input.value = input.value.replace(this.state.validLang, '')
        if (!this.detectQuizObjectValue()) {
            this.setState({valid: true})
            this.setState({disabled: false})
        } else {
            this.resetStateValid()
        }
    }

    getValueOnSelect = (select) => {
        this.setState({rightAnswerId: +select.value})
    }

    addNewQuestion = (e) => {
        e.preventDefault()

        const quizObject = {
            question: '',
            answers: {
                answer1: {
                    value: '',
                    id: 1,
                },
                answer2: {
                    value: '',
                    id: 2,
                },
                answer3: {
                    value: '',
                    id: 3,
                },
                answer4: {
                    value: '',
                    id: 4,
                },
            },
            rightId: '',
        }

        quizObject.rightId = this.state.rightAnswerId

        for (let key in quizObject.answers) {
            this.inputs.forEach(input => {
                if (quizObject.answers[key].id === +input.id)
                    quizObject.answers[key].value = input.value
                else if (input.classList.contains('title__input'))
                    quizObject.question = input.value
            })
        }

        if (this.state.valid) {
            this.quizItem.push(quizObject)
            this.form.reset()
            this.resetStateValid()
        }
        console.log(this.quizItem)
    }

    postQuestion = (e) => {
        e.preventDefault()
        postData(this.url, this.quizItem)
            .then(() => {
                this.form.reset()
                this.resetStateValid()
                this.quizItem = []
                console.log(this.quizItem)
            })
    }

    render() {
        return (
            <div className="quizCreate__wrapper">
                <h1>Создать тест</h1>
                <form className="quizCreate__form">
                    <div className="question__input">
                        <label className="label__title">{this.state.question.label}
                            <input name="question"
                                   type="text"
                                   className="quizCreator__input title__input"
                                   onInput={(e) => this.detectInputsValidate(e.target)}/>
                        </label>
                    </div>
                    <hr/>
                    <div className="answers__inputs">
                        {Object.keys(this.state.answers).map((controlName, i) => {
                            const control = this.state.answers[controlName]
                            return (
                                <Input
                                    key={i}
                                    label={control.label}
                                    class={control.class}
                                    type={control.type}
                                    labelClass={control.labelClass}
                                    handlerDetect={this.detectInputsValidate}
                                    id={i+1}
                                    />
                            )
                        })}
                        <Select state={this.state} handler={this.getValueOnSelect}/>
                        <div className="form__btns">
                            <button type="submit"
                                    className={this.state.disabled ? "quizCreator__btn disabled" : "quizCreator__btn add"}
                                    disabled={this.state.disabled}
                                    onClick={this.addNewQuestion}>Добавить вопрос</button>
                            <button type="submit"
                                    className={this.quizItem.length === 0 ? "quizCreator__btn disabled" : "quizCreator__btn create"}
                                    disabled={this.quizItem.length > 0 ? false : this.state.disabled}
                                    onClick={this.postQuestion}>Создать тест</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default QuizCreator
