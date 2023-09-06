/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';


// ----------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: false,
    users: [],
    user: null,
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getUsersSuccess(state, action) {
            state.isLoading = false;
            state.users = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;

export function getUsers(filter = false) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/users`);
            dispatch(slice.actions.getUsersSuccess(response.data.users));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

