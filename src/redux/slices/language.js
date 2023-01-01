/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  languages: [],
  language: null,
  search: null,
  sortBy: null
};

const slice = createSlice({
  name: 'language',
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
      console.log(action.payload);
    },

    // GET LANGUAGES
    getLanguagesSuccess(state, action) {
      state.isLoading = false;
      state.languages = [];
      const allLanguages = action.payload.data;
      if (allLanguages)
        allLanguages.forEach((language) => {
          state.languages[language.firstlanguage_id] = language;
        });
    },

    // GET LANGUAGE
    getLanguageSuccess(state, action) {
      state.isLoading = false;
      state.language = action.payload.data;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getLanguagesSuccess, getLanguageSuccess, hasError, startLoading } = slice.actions;

// ----------------------------------------------------------------------

export function getLanguages() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/languages`);
      dispatch(slice.actions.getLanguagesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getLanguageById(idLanguage) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/languages/${idLanguage}`);
      dispatch(slice.actions.getLanguageSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
