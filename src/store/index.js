import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';
import authReducer from './authSlice';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
        auth: authReducer,
    },
});