import getData from "../../components/sevices/getData";
import { FETCH_QUIZ_ERROR, FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS } from "./actionTypes";

export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizStart())
        await getData('https://quizapp-667c6.firebaseio.com/quizApp.json')
            .then(response => {
                const quizes = []
                Object.keys(response).forEach(item => {
                    quizes.push(item)
                })
                dispatch(fetchStateSuccess(quizes))
            })
            .catch(e => dispatch(fetchStateError(e)))
    }
}

export const fetchQuizStart = () => {
    return {
        type: FETCH_QUIZ_START
    }
}

export const fetchStateSuccess = (quizzes) => {
    return {
        type: FETCH_QUIZ_SUCCESS,
        playload: quizzes
    }
}

export const fetchStateError = (e) => {
    return {
        type: FETCH_QUIZ_ERROR,
        playload: e
    }
}
