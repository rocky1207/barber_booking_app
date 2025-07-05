import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import barberReducer from '../slices/barberSlice';
import uiReducer from '../slices/UiSlice';

const barberPersistConfig = {
  key: 'barber',
  storage,
};

/*
const uiPersistConfig = {
  key: 'ui',
  storage,
};
*/
export const reducers = {
  barber: persistReducer(barberPersistConfig, barberReducer),
  ui: uiReducer
};