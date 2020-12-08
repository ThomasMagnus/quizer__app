import React from 'react'
import AnswerItems from "./answerItems/AnswerItems";

const AnswersList = ({questions, handler, count, state, answersArr, yourAnswersArr}) => {
    return (
        <ul className="main__list">
            <AnswerItems
                questions = {questions}
                handler={handler}
                count={count}
                state={state}
                answersArr={answersArr}
                yourAnswersArr = {yourAnswersArr}/>
        </ul>
    )
}

export default AnswersList
