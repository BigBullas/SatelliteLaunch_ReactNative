import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadCapacityStart: 0,
    loadCapacityEnd: 500,
    searchValue: ""
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setLoadCapacityStart: (state, { payload }) => {
            state.loadCapacityStart = payload;
        },
        setLoadCapacityEnd: (state, { payload }) => {
            state.loadCapacityEnd = payload;
        },
        setSearchValue: (state, { payload }) => {
            console.log('setSearchValue: ', payload);
            state.searchValue = payload;
        },
    },
});

export const filterReducer = filterSlice.reducer;

export const { setLoadCapacityStart, setLoadCapacityEnd, setSearchValue } = filterSlice.actions;