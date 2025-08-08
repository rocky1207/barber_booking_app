import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import barberReducer from '../slices/barberSlice';
import serviceReducer from '../slices/serviceSlice';
import uiReducer from '../slices/uiSlice';

const barberPersistConfig = {
  key: 'barber',
  storage,
};
const servicePersistConfig = {
  key: 'service',
  storage
};

/*
const uiPersistConfig = {
  key: 'ui',
  storage,
};
*/
export const reducers = {
  barber: persistReducer(barberPersistConfig, barberReducer),
  service: persistReducer(servicePersistConfig, serviceReducer),
  ui: uiReducer
};