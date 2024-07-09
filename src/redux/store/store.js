import { configureStore } from '@reduxjs/toolkit';
import authLoginReducer from '../reducers/AuthLogin';
import taskReducer from '../actions/TaskSlice';

export default configureStore({
	reducer: {
		authLogin: authLoginReducer,
		taskAction: taskReducer,
	},
});
