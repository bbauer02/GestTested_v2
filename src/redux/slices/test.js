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
    getTestsSuccess(state, action) {
      state.isLoading = false;
      state.tests = action.payload;
    },
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
