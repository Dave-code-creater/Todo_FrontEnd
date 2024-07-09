import { createSlice } from '@reduxjs/toolkit';
import { login, register, logout } from '../actions/AuthSlice';
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		cookie: null,
		error: null,
		loading: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload.message;
			})
			.addCase(register.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(register.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload.message;
			})
			.addCase(logout.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload.message;
			});
	},
});

export default authSlice.reducer;
