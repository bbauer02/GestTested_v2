/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';


import {SKILLS} from '../../../src/_mock/question/skills';

const initialState = {
    isLoading: false,
    error: false,
    skills: [],
    skill: null,
}

const slice = createSlice( {
    name: 'skill',
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
        getSkillsSuccess(state, action) {
            state.isLoading = false;
            state.skills = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getSkills() {
    return async (dispatch) => {

        dispatch(slice.actions.startLoading());
        try {
            // const response = await axios.get(`/questions`);
            const response = {};
            dispatch(slice.actions.getSkillsSuccess(SKILLS));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

