/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: false,
    invoices: [],
    invoice: null,
};

const slice = createSlice({
    name: 'invoice',
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
        getInvoiceSuccess(state, action) {
            state.isLoading = false;
            state.invoice = action.payload;
        },
        getInvoicesSuccess(state, action) {
            state.isLoading = false;
            state.invoices = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;

export function getInvoices(institut_id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/instituts/${institut_id}/invoices`);
            dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}