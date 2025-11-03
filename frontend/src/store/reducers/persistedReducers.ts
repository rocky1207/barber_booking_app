import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import barberReducer from '../slices/barberSlice';
import serviceReducer from '../slices/serviceSlice';
import uiReducer from '../slices/uiSlice';
import appointmentReducer from '../slices/appointmentSlice';
import workingHoursReducer from '../slices/workingHoursSlice';

const barberPersistConfig = {
  key: 'barber',
  storage
};
const servicePersistConfig = {
  key: 'service',
  storage
};
const appointmentPersistConfig = {
  key: 'appointment',
  storage
};
const workingHoursConfig = {
  key: 'workingHours',
  storage
}

/*
const uiPersistConfig = {
  key: 'ui',
  storage,
};
*/
export const reducers = {
  barber: persistReducer(barberPersistConfig, barberReducer),
  service: persistReducer(servicePersistConfig, serviceReducer),
  appointment: persistReducer(appointmentPersistConfig, appointmentReducer),
  workingHours: persistReducer(workingHoursConfig, workingHoursReducer),
  ui: uiReducer
};