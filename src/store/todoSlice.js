// todoSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    todos: [],
    loading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/'
    );
    return response.data;
});

export const addTodoAsync = createAsyncThunk('todo/addTodo', async (todo) => {
    const response = await axios.post(
        'https://jsonplaceholder.typicode.com/todos/',
        todo
    );
    return response.data;
});

export const removeTodoAsync = createAsyncThunk(
    'todo/remove',
    async (todoId) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
        return todoId;
    }
);

export const toggleTodoAsync = createAsyncThunk(
    'todo/toggleTodo',
    async ({ todoId, completed }) => {
        const response = await axios.patch(
            `https://jsonplaceholder.typicode.com/todos/${todoId}`,
            { completed }
        );
        return response.data;
    }
);

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        removeAllTodos: (state) => {
            state.todos = [];
        },
        toggleTodo: (state, action) => {
            const { todoId } = action.payload;
            const todo = state.todos.find((todo) => todo.id === todoId);
            if (todo) {
                todo.completed = !todo.completed;
                // localStorage'a güncellenmiş todos'u kaydet
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.loading = false;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const updatedTodo = action.payload;
                const existingTodoIndex = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
                if (existingTodoIndex !== -1) {
                    state.todos[existingTodoIndex] = updatedTodo;
                }
            });
    },
});

export const { removeAllTodos, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
