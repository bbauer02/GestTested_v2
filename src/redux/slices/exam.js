/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  exams: [],
  exam: null,
};

const slice = createSlice({
  name: 'exam',
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
    // GET EXAMS
    getExamsSuccess(state, action) {
      state.isLoading = false;
      state.exams = action.payload;
    },
    // GET EXAM
    getExamSuccess(state, action) {
      state.isLoading = false;
      state.exam = action.payload;
    },
    // ADD EXAM
    addExam(state, action) {
      state.isLoading = false;
      state.exams = [...state.exams, action.payload];
    },
    // UPDATE EXAM
    updateExam(state, action) {
      state.isLoading = false;
      const updatedExam = action.payload;
      const index = state.exams.findIndex(obj => {return obj.exam_id === updatedExam.exam_id});
      state.exams[index] = updatedExam;
    },
    // DELETE EXAM
    deleteExam(state, action) {
      state.isLoading = false;
      const { id } = action.payload;
      const deleteExam = state.exams.filter((exam) => exam.exam_id !== id);
      state.exams = deleteExam;
    }
  }
});

// Reducer
export default slice.reducer;

// GET EXAMS ----------------------------------------------------

export function getExams() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/exams');
      dispatch(slice.actions.getExamsSuccess(response.data.exams));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// GET EXAM --------------------------------------------------------
export function getExam(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/exams/${id}`);
      dispatch(slice.actions.getExamSuccess(response.data.exam));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
// POST EXAMS ------------------------------------------------------

export function postExam(exam) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/exams', exam);
      dispatch(slice.actions.addExam(response.data.exam));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// PUT EXAMS ------------------------------------------------------

export function putExam(exam) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/exams/${exam.exam_id}`, exam);
      dispatch(slice.actions.updateExam(response.data.exam));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }


  };
}
// DELETE EXAMS ------------------------------------------------------
export function deleteExam(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/exams/${id}`);
      dispatch(slice.actions.deleteExam({ id }));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
