import {
    GET_QUESTION,
    GET_QUESTION_SUCCESS,
    GET_QUESTION_FAILED
} from '../actions/types'

const defaultState = {
    isLoading: false,
    isRefreshing: false,
    error: undefined,
    questions: []    
}

export default function getQuestions(state = defaultState, action) {
    switch (action.type) {
        case GET_QUESTION:
            return {
                ...state,
                isLoading: true,
                isRefreshing: true,
                error: undefined,
                questions: []
            }
        case GET_QUESTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isRefreshing: false,
                error: undefined,
                questions: action.data
            }
        case GET_QUESTION_FAILED: 
            return {
                ...state,
                isLoading: false,
                isRefreshing: false,
                error: action.data,
                questions: []
            }
        default:
            return state
    }
}