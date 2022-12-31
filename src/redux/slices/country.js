/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  countries: [],
  country: null,
  search: null,
  sortBy: null
};

const slice = createSlice({
  name: 'country',
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

    // GET COUNTRIES
    getCountriesSuccess(state, action) {
      state.isLoading = false;
      state.countries = {};
      const allCountries = action.payload.data;
      if (allCountries)
        allCountries.forEach((country) => {
          state.countries[country.country_id] = country;
        });
    },

    // GET COUNTRY
    getCountrySuccess(state, action) {
      state.isLoading = false;
      state.country = action.payload.data;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getCountriesSuccess, getCountrySuccess, hasError, startLoading } = slice.actions;

// ----------------------------------------------------------------------

export function getCountries() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/countries`);
      dispatch(slice.actions.getCountriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCountryById(idCountry) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/countries/${idCountry}`);
      dispatch(slice.actions.getCountrySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
