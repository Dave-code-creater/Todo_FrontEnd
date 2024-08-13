import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	messages: [],
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
		removeMessage: (state, action) => {
			state.messages = state.messages.filter(
				(message) => message.id !== action.payload
			);
		},
	},
});

export const { addMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
