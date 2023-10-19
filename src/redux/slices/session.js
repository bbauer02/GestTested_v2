/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';


const initialState = {
    isLoading: false,
    error: false,
    sessions: [],
    session: null,
    sessionUser: null,
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
            state.sessions.push(newSession);
        },
        postSessionUserOptionSuccess(state, action) {
            state.isLoading = false;
            state.sessionUser.sessionUsers[0].sessionUserOptions.push(action.payload);
        },
        putSessionUserOptionSuccess(state, action) {
            state.isLoading = false;
            const updatedOptions = state.sessionUser.sessionUsers[0].sessionUserOptions.map( (opt) => {
                if(opt.option_id === action.payload.option_id) {
                    return action.payload;
                }
                return opt;
            });
            state.sessionUser.sessionUsers[0].sessionUserOptions = updatedOptions;
        },
        deleteSessionUserOptionSuccess(state, action) {
            state.isLoading = false;
            const updatedOptions =  state.sessionUser.sessionUsers[0].sessionUserOptions.filter(opt => opt.option_id !== +action.payload);
            state.sessionUser.sessionUsers[0].sessionUserOptions = updatedOptions;
        },
        // GET SESSION USER
        getSessionUserSuccess(state, action) {
            state.isLoading = false;
            state.sessionUser = action.payload;
        },
        // GET SESSIONS
        getSessionsSuccess(state, action) {
            state.isLoading = false;
            state.sessions = action.payload;
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
        },
        // PUT SESSION
        putSessionSuccess(state, action) {
            state.isLoading = false;
            const session_updated = action.payload;
            const updatedSessions = state.sessions.map((_session) => {
                if(_session.session_id === session_updated.session_id) {

                    return {..._session, ...session_updated};
                }
                return _session;
            });
            state.isLoading = false;
            state.sessions = updatedSessions;
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
            dispatch(slice.actions.addSession(response.data.session));
        }
        catch(error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// putSessionAdmin
export function putSessionAdmin(idInstitut, idSession, session) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
           const response =  await axios.put(`/instituts/${idInstitut}/sessions/${idSession}/admin`, session);
           dispatch(slice.actions.putSessionSuccess(response.data.session))
        }
        catch(error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
// putSession
export function putSession(idInstitut, idSession, session) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
           const response =  await axios.put(`/instituts/${idInstitut}/sessions/${idSession}`, session);
           dispatch(slice.actions.putSessionSuccess(response.data.session))
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
// getSessionsByInstitut
export function getSessionsByInstitut(idInstitut) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/instituts/${idInstitut}/sessions`);
            dispatch(slice.actions.getSessionsSuccess(response.data.sessions));
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

// GET SESSION USER -----------------------

export function getSessionUser(institutId, sessionId, userId) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
           
            const response = await axios.get(`/instituts/${institutId}/sessions/${sessionId}/users/${userId}`);
            dispatch(slice.actions.getSessionUserSuccess(response.data.sessionUser));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}


// ADD USER OPTION

export function addUserOption(institutId, option) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {

            const response = await axios.post(`/instituts/${institutId}/options`, option);
            dispatch(slice.actions.postSessionUserOptionSuccess(response.data.sessionUserOption));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }

    }
}

export function updateUserOption(institutId, sessionUser_id, exam_id, option_id, option) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/instituts/${institutId}/sessionUsers/${sessionUser_id}/exams/${exam_id}/options/${option_id}`, option);
            dispatch(slice.actions.putSessionUserOptionSuccess(response.data.optionUpdated));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

export function deleteUserOption(institutId, sessionUser_id, exam_id, option_id) {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`/instituts/${institutId}/sessionUsers/${sessionUser_id}/exams/${exam_id}/options/${option_id}`);
            dispatch(slice.actions.deleteSessionUserOptionSuccess(response.data.optionDeleted));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

