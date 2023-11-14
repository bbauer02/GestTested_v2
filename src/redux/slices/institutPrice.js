import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
    isLoading: false,
    error: false,
    prices: {},
    currentInstitut: null,
    currentExam: null,
    currentTest: null,
    admin: false
};

const slice = createSlice({
    name: 'institutPrice',
    initialState,
    reducers: {
        setCurrentTest(state, action) {
            state.currentTest = action.payload;
        },

        setCurrentExam(state, action) {
            state.currentExam = action.payload;
        },

        setCurrentInstitut(state, action) {
            state.currentInstitut = action.payload;
        },

        setCurrentAdmin(state, action) {
            state.admin = action.payload;
        },

        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        setExamPrices(state, action) {
            state.prices = {};
            const newPrices = action.payload;
            newPrices.forEach((exam) => {
                state.prices[exam.price_id] = exam;
            });
        },

        addPrice(state, action) {
            const newPrice = action.payload;
            state.prices[newPrice.price_id] = newPrice;
        },

        /**
         * Editer un prix.
         * @param state
         * @param action
         */
        updatePrice(state, action) {
            const newPrice = action.payload;
            state.prices[newPrice.price_id] = newPrice;
        }
    }
});

// Reducer
export default slice.reducer;

// actions
export const {
    setCurrentAdmin,
    setExamPrices,
    setCurrentInstitut,
    updatePrice,
    addPrice,
    startLoading,
    hasError,
    setCurrentTest,
    setCurrentExam
} =
    slice.actions;

// ----------------------------------------------------------------------

export function getExamPrices(institutId) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/instituts/${institutId}/exams/price`);
            // console.log('data', institutId, response.data.data)
            dispatch(slice.actions.setExamPrices(response.data.data));
        } catch (error) {
            console.error(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function getExamPricesByFK(institutId, examId) {
    return async () => {
        try {
            const response = await axios.get(`/instituts/${institutId}exams/${examId}/price`);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    };
}

// ----------------------------------------------------------------------

export function postExamPrice(institutId, ExamPrice) {
    return async (dispatch) => {
        // console.log('avant post', ExamPrice);
        const response = await axios.post(`/instituts/${institutId}/exams/price`, ExamPrice);
        dispatch(slice.actions.addPrice(response.data.data));
    };
}

// ----------------------------------------------------------------------

export function putExamPrice(institutId, ExamPrice) {
    return async (dispatch) => {
        // console.log('avant put', ExamPrice);
        const response = await axios.put(`/instituts/${institutId}/exams/price`, ExamPrice);
        dispatch(slice.actions.updatePrice(response.data.data));
    };
}

// ----------------------------------------------------------------------