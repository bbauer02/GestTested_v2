import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import institutReducer from './slices/institut';
import countryReducer from './slices/country';
import languageReducer from './slices/language';
import examReducer from './slices/exam';
import testReducer from './slices/test';
import sessionReducer from './slices/session';
import userReducer from './slices/user';
import invoiceReducer from './slices/invoice';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};
const rootReducer = combineReducers({
  institut: institutReducer,
  country: countryReducer,
  language: languageReducer,
  exam: examReducer,
  test: testReducer,
  session: sessionReducer,
  user: userReducer,
  invoice: invoiceReducer

});

export default rootReducer;
