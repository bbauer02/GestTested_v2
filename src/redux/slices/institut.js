import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';


const initialState = {
    isLoading: false,
    error: false,
    instituts: [],
    institut: null,

};

const slice = createSlice({
    name: 'instituts',
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
        getInstitutsSuccess(state, action) {
            state.isLoading = false;
            state.instituts = action.payload;
        },
        // GET INSTITUT
        getInstitutSuccess(state, action) {
            state.isLoading = false;
            state.institut = action.payload;
        },
        // POST INSTITUT
        postInstitutSuccess(state, action) {
          state.isLoading = false;

          state.instituts = [...state.instituts, action.payload ];
        },
        // PUT INSTITUT
        putInstitutSuccess(state, action) {
          const institut = action.payload;
          const updatedInstituts = state.instituts.map((_institut) => {
            if(_institut.institut_id === institut.institut_id) {
              return institut;
            }
              return _institut;
          });
          state.isLoading = false;
          state.instituts = updatedInstituts;
          state.institut = institut;
        },
        // DELETE  INSTITUT
        deleteInstitutSuccess(state, action) {
          state.isLoading = false;
          const updatedInstitutsList = state.instituts.filter((institut) => institut.institut_id !== action.payload.institut_id)
          state.instituts = updatedInstitutsList;
        },
    }
});

// Reducer
export default slice.reducer;

// Actions
 /* export const {

} = slice.actions */

// GET INSTITUTS ----------------------------------------------------
export function getInstituts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/instituts');
      dispatch(slice.actions.getInstitutsSuccess(response.data.instituts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// GET INSTITUT BY ID ----------------------------------------------------
export function getInstitut(id) {
  return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.get(`/instituts/${id}`);
        dispatch(slice.actions.getInstitutSuccess(response.data.institut));
      } catch (error) {
        console.error(error);
        dispatch(slice.actions.hasError(error));
      }
  };
}

// POST INSTITUT ----------------------------------------------------
export function postInstitut(institut) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/instituts', institut);
      dispatch(slice.actions.postInstitutSuccess(response.data.institut));
    }
    catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }

  };
}
// PUT INSTITUT ----------------------------------------------------
export function putInstitut(institut) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/instituts/${institut.institut_id}`, institut);
      dispatch(slice.actions.putInstitutSuccess(response.data.institut));
    }
    catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }

  };
}
// DELETE INSTITUT ----------------------------------------------------
export function deleteInstitut(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/instituts/${id}`);
      dispatch(slice.actions.deleteInstitutSuccess(response.data.institut));
    }
    catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }

  };
}