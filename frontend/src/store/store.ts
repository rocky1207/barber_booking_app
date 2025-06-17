import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/UiSlice";
import barberReducer from "./slices/barberSlice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        barber: barberReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;