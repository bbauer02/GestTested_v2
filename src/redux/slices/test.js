/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  tests: [],
  test: null,
};

const slice = createSlice({
  name: 'test',
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
    // GET INSTITUTS
      getTestSuccess(state, action) {
          state.isLoading = false;
          state.test = action.payload;
      },
    getTestsSuccess(state, action) {
      state.isLoading = false;
      state.tests = action.payload;
    },
    // POST INSTITUT
    postTestSuccess(state, action) {
      state.isLoading = false;
      state.tests.push(action.payload);
    },
    // PUT INSTITUT
    putTestSuccess(state, action) {
        state.isLoading = false;
        state.tests = state.tests.map((test) =>
            test.id === action.payload.id ? action.payload : test
        );
    },
    // DELETE INSTITUT
    deleteTestSuccess(state, action) {
        state.isLoading = false;
        state.tests = state.tests.filter((test) => test.test_id !== action.payload);
    }
  }
});

// Reducer
export default slice.reducer;

// GET TESTS ----------------------------------------------------

export function getTests(child=false) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/tests?child=${child}`);
      dispatch(slice.actions.getTestsSuccess(response.data.tests));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Ajouter un test

export function postTest(test) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/tests', test);
            dispatch(slice.actions.postTestSuccess(response.data.test));
        } catch (error) {
        dispatch(slice.actions.hasError(error));
        }
    };
}

// Modifier un test

export function putTest(test) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/tests/${test.test_id}`, test);
            dispatch(slice.actions.putTestSuccess(response.data.test));
        } catch (error) {
        dispatch(slice.actions.hasError(error));
        }
    };
}


// get test by id

export function getTest(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/tests/${id}`);
            dispatch(slice.actions.getTestSuccess(response.data.test));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Delete test

export function deleteTest(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            await axios.delete(`/tests/${id}`);
            dispatch(slice.actions.deleteTestSuccess(id));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}