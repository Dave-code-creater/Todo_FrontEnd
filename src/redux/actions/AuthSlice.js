import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin, signup } from '../../services/auth';
import { jwtDecode } from 'jwt-decode';

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await signin({ email, password });
			if (response.status === 200) {
				// Corrected to 200
				localStorage.setItem(
					'accessToken',
					response.data.accessToken // Corrected to data
				);
				localStorage.setItem(
					'refreshToken',
					response.data.refreshToken // Corrected to data
				);

				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message);
		}
	}
);
export const register = createAsyncThunk(
	'auth/register',
	async (
		{ username, email, password, status, created_at, updated_at },
		{ rejectWithValue }
	) => {
		try {
			const response = await signup({
				username,
				email,
				password,
				status,
				created_at,
				updated_at,
			});
			if (response.status === 201) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message);
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
	},

	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.user = null;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = jwtDecode(action.payload.accessToken);
				state.error = null;
				state.status = 'succeeded';
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				if (
					action.error.message ===
					'Request failed with status code 401'
				) {
					state.error = 'Invalid email or password';
				} else {
					state.error = action.error.message;
				}
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.user = null;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.error = null;
				state.status = 'succeeded';
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.error = action.error.message;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
				state.error = null;
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
