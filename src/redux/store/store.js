import { configureStore } from '@reduxjs/toolkit';
import authLoginReducer from '../actions/AuthSlice';
import taskReducer from '../actions/TaskSlice';
import messageReducer from '../actions/message';

export default configureStore({
	reducer: {
		authLogin: authLoginReducer,
		taskAction: taskReducer,
		message: messageReducer,
	},
});
