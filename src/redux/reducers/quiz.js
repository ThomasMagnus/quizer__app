import { FETCH_QUIZ_ERROR, FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS } from "../actions/actionTypes";

const initialState = {
    quizArr: [],
    loader: false
}

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZ_START:
            return {
                state, loader: false
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                state, loader: true, quizArr: action.playload
            }
        case FETCH_QUIZ_ERROR:
            return {
                state, loader: true, error: action.error
            }
        default:
            return state
    }
}
