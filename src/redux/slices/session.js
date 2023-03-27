/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import {dispatch} from "../store";

const initialState = {
    isLoading: false,
    error: false,
    sessions: [],
}

const slice = createSlice({
    name: 'session',
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
        // ADD SESSION
        addSession(state, action) {
            state.isLoading = false;
            const newSession = action.payload.data;
            state.sessions[newSession.session_id] = newSession;
        },
        // GET SESSIONS
        getSessionsSuccess(state, action) {
            state.isLoading = false;
            state.sessions = [];
            const allSessions = action.payload;
            if (allSessions)
            allSessions.forEach((session) => {
                state.sessions[session.session_id] = session;
            });
        },
        // GET SESSION
        getSessionSuccess(state, action) {
            state.isLoading = false;
            state.session = action.payload;
        },
        // DELETE SESSION
        deleteSession(state, action) {
            state.isLoading = false;
            const deleteSession = state.sessions.filter((session) => session.session_id != action.payload.session_id);
            state.sessions = deleteSession;
        }
    }
})

// Reducer
export default slice.reducer;

// postSession

export function postSession(idInstitut, session) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            
            const response =await axios.post(`/instituts/${idInstitut}/sessions`, session);
            console.log(response)
            //dispatch(addSession(response.data));
        }
        catch(error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
// getSession

export function getSession(idInstitut, idSession) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/instituts/${idInstitut}/sessions/${idSession}`);
            dispatch(slice.actions.getSessionSuccess(response.data.session));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}
// getSessionsFiltered ----------------------------------------------------

export function getSessionsFiltered(filters) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/sessions', {params:filters});
            dispatch(slice.actions.getSessionsSuccess(response.data.sessions));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// DELETE SESSION --------------------------------------------------------

export function removeSession(institutId, sessionId) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/instituts/${institutId}/sessions/${sessionId}`);
            dispatch(slice.actions.deleteSession(response.data.session));
        } catch (error) {
            console.error(error);
            dispatch(slice.action.hasError(error));
        }
    }
}
