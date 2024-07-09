import { createAsyncThunk } from '@reduxjs/toolkit';
import { signin, signup } from '../../services/auth';

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await signin({ email, password });
			console.log(email, password, response.data);
			if (response.status === 201) return response.data;
			else return rejectWithValue(response.data);
		} catch (error) {
			return rejectWithValue(error.response.data);
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
			if (response.status === 201) return response.data;
			else return rejectWithValue(response.data);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	try {
		// Perform async tasks (e.g., API calls, localStorage updates)
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');

		// Return a success message or data if needed
		return { success: true }; // For example, returning success true
	} catch (error) {
		// Handle errors if any
		throw new Error('Logout failed'); // Or handle as necessary
	}
});
