import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payloads: [],
    payload: {},
};

export const payloadSlice = createSlice({
    name: 'payload',
    initialState,
    reducers: {
        setPayloads: (state, action) => {
            console.log('setPayloas: ', action.payload);
            state.payloads = action.payload;
        },
        setPayload: (state, { payload }) => {
            console.log('setPayload: ', payload);
            state.payload = payload;
        },
        resetPayload: (state) => {
            console.log('resetPayload');
            state.payload = {};
        },
    },
});

export const payloadReducer = payloadSlice.reducer;

export const { setPayloads, setPayload, resetPayload } = payloadSlice.actions;
