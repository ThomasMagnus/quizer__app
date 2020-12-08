import React from 'react'
import './endQuiz.css'

const EndQuiz = (props) => {
    return (
        <>
            <h1>Тест окончен!</h1>
            <div className="endQuestion__wrapper">
                <p className="answers">Ваши ответы:</p>
                <ul className="answers__list">
                    {props.answersArr.map((item, i) => <li className="anwers__item" key={i}>
                        {item}
                            <li className="my-answer">
                                {'- ' + props.yourAnswersArr[i]}
                                <i className={props.checkAnswer[i]}></i>
                            </li>
                    </li>)}
                </ul>
                <p className="answer-counter">Правильно {props.rightAnswerCounter} из {props.quiz.length}</p>
                <button className="answer__btn" onClick={props.tryAgain}>Начать заново</button>
            </div>
        </>
    )
}

export default EndQuiz
