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
        deleteInvoiceByUserSuccess(state, action) {
            state.isLoading = false;
            state.invoice = action.payload;
            state.invoices =  state.invoices.filter((_invoice) => _invoice.institut_id !== action.payload.institut_id && _invoice.session_id !== action.payload.session_id && _invoice.user_id !== action.payload.user_id)
        }
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

export function getInvoice(institut_id,invoice_id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/instituts/${institut_id}/invoices/${invoice_id}`);
            dispatch(slice.actions.getInvoiceSuccess(response.data.invoice));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getInvoiceByUser(institut_id, session_id,user_id ) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/instituts/${institut_id}/sessions/${session_id}/users/${user_id}/invoices`);
            dispatch(slice.actions.getInvoiceSuccess(response.data.invoice));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deleteInvoiceByUser(institut_id, session_id, user_id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/instituts/${institut_id}/sessions/${session_id}/users/${user_id}/invoices`);
            dispatch(slice.actions.deleteInvoiceByUserSuccess(response.data.invoice));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}