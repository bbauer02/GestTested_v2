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
        getUserSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },
        updateUserSuccess(state, action) {
            const user = action.payload;
            state.isLoading = false;
            //console.log()
           // state.users = updatedUsers;
           state.user = {...state.user, ...user};
        },
        deleteUserSuccess(state, action) {
            state.isLoading = false;
            const updatedUsersList = state.users.filter((user) => user.user_id !== action.payload.user_id)
            state.users = updatedUsersList;
        }
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

export function getUser(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/users/${id}`);
            dispatch(slice.actions.getUserSuccess(response.data.user));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// UPDATE

export function putUser(id, user) {

    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/users/${id}`, user);
            dispatch(slice.actions.updateUserSuccess( response.data.User));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            console.error(error);
        }
    };
}

export function deleteUser(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/users/${id}`);
            dispatch(slice.actions.deleteUserSuccess(response.data.user));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            console.error(error);
        }
    };
}

