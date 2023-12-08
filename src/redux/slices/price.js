import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
    isLoading: false,
    error: false,
    examsPrices: [],
    selectedTest: null,
    selectedTestChild: null,
    admin: false
};

const slice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        selectTest(state, action) {
            state.selectedTest = action.payload;
        },
        selectTestChild(state, action) {
            state.selectedTestChild = action.payload;
        },

        setCurrentExam(state, action) {
            state.isLoading = false;
            state.currentExam = action.payload;
        },

        setCurrentAdmin(state, action) {
            state.isLoading = false;
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

        },

        /**
         * Editer un prix.
         * @param state
         * @param action
         */
        updatePrice(state, action) {
            const newPrice = action.payload;
            state.prices[newPrice.price_id] = newPrice;
        },
        getExamPricesSuccess(state, action) {
            state.isLoading = false;
            state.examsPrices = action.payload;
        },
        postExamPriceSuccess(state,action) {
            state.isLoading=false;

            // state.examsPrices =
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
    selectTest,
    setCurrentExam,
    selectTestChild,

} =
    slice.actions;

// ----------------------------------------------------------------------

export function getExamPrices(institutId, testId) {
    return async (dispatch) => {
        try {

            const response = await axios.get(`/instituts/${institutId}/tests/${testId}/exams/prices`);
           dispatch(slice.actions.getExamPricesSuccess(response.data.examPrice));
        } catch (error) {
            console.error(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------
export function postExamPrice(institutId, examId, ExamPrice) {
    return async (dispatch) => {
        const response = await axios.post(`/instituts/${institutId}/exams/${examId}/price`, ExamPrice);
        console.log(response.data.price)
        dispatch(slice.actions.addPrice(response.data));
    };
}

export function putExamPrice(institutId, examId, ExamPrice) {
    return async (dispatch) => {
        const response = await axios.put(`/instituts/${institutId}/exams/${examId}/price`, ExamPrice);
        console.log(response.data.price)
        dispatch(slice.actions.addPrice(response.data));
    };
}
/*
export function getExamPricesByFK(institutId, examId) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/instituts/${institutId}exams/${examId}/price`);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    };
}
*/
// ----------------------------------------------------------------------
/*
export function postExamPrice(institutId, ExamPrice) {
    return async (dispatch) => {
        // console.log('avant post', ExamPrice);
        const response = await axios.post(`/instituts/${institutId}/exams/price`, ExamPrice);
        dispatch(slice.actions.addPrice(response.data.data));
    };
}
*/
// ----------------------------------------------------------------------
/*
export function putExamPrice(institutId, ExamPrice) {
    return async (dispatch) => {
        // console.log('avant put', ExamPrice);
        const response = await axios.put(`/instituts/${institutId}/exams/price`, ExamPrice);
        dispatch(slice.actions.updatePrice(response.data.data));
    };
}
*/
// ----------------------------------------------------------------------