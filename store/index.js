import { configureStore } from '@reduxjs/toolkit';
import { payloadReducer } from './payloadSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
    reducer: {
        payload: payloadReducer,
        filter: filterReducer,
    },
});
