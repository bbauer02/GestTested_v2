/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';


// MOCK
import {QUESTIONS} from '../../../src/_mock/question/questions';

const initialState = {
    isLoading: false,
    error: false,
    questions: [],
    question: null,
}

const slice = createSlice( {
    name: 'question',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        // GET QUESTION
        getQuestionsSuccess(state, action) {
            state.isLoading = false;
            state.questions = action.payload;
        },
        // DELETE QUESTION
        deleteSessionSuccess(state, action) {
            state.isLoading = false;
            const deleteQuestion = state.questions.filter((question) => question.question_id != action.payload.question_id);
            state.questions = deleteQuestion;
        }
    }
});

// Reducer
export default slice.reducer;


export function getQuestions() {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
           // const response = await axios.get(`/questions`);
            const response = {};
            dispatch(slice.actions.getQuestionsSuccess(QUESTIONS));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}


export function removeQuestion(questionId) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            //  const response = await axios.delete(`/questions/${questionId}`);
            const response = {};
            dispatch(slice.actions.deleteSessionSuccess(response));
        } catch (error) {
            console.error(error);
            dispatch(slice.action.hasError(error));
        }
    }
}