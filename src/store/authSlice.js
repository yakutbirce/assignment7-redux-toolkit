import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        signup: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { login, signup } = authSlice.actions;
export default authSlice.reducer;