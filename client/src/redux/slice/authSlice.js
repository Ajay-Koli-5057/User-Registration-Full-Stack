
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_BASE_URL = "http://localhost:8080/api";

export const loginUser = createAsyncThunk('user/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, userData);
        console.log("response=======>", response);
        localStorage.setItem('token', response?.data?.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const signupUser = createAsyncThunk('user/signupUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/create`, userData);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { dispatch }) => {
    localStorage.removeItem('token');
    dispatch(clearUser());
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
        token: localStorage.getItem('token'),
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            });
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;


