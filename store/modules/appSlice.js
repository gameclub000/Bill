import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    language: 'en'
};

export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
});

export const { setLanguage } = slice.actions;

export const selectLanguage = (state) => state.app.language;

export default slice.reducer;
