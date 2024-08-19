import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signin, signup } from '../../services/auth';
import { jwtDecode } from 'jwt-decode';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await signin({ email, password });
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data;
            } else {
                return rejectWithValue({
                    code: response.status,
                    message: response.data.message || 'Login failed',
                });
            }
        } catch (error) {
            return rejectWithValue({
                code: error.response?.status,
                message: error.response?.data.message || error.message,
            });
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await signup({ username, email, password });
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data;
            } else {
                return rejectWithValue({
                    code: response.status,
                    message: response.data.message || 'Registration failed',
                });
            }
        } catch (error) {
            return rejectWithValue({
                code: error.response?.status,
                message: error.response?.data.message || error.message,
            });
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        return { success: true };
    } catch (error) {
        throw new Error('Logout failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        status: 'idle',
        errorCode: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = jwtDecode(action.payload.accessToken);
                state.error = null;
                state.status = 'succeeded';
                state.errorCode = 200;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
                state.status = 'failed';
                state.errorCode = action.payload.code;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.status = 'loading';
                state.errorCode = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = jwtDecode(action.payload.accessToken);
                state.error = null;
                state.status = 'succeeded';
                state.errorCode = 200;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
                state.status = 'failed';
                state.errorCode = action.payload.code;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
                state.status = 'idle';
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
