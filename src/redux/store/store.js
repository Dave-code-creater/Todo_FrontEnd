import { configureStore } from '@reduxjs/toolkit';
import authLoginReducer from '../actions/AuthSlice';
import taskReducer from '../actions/TaskSlice';
import companyReducer from '../actions/CompanySlice';
import userReducer from '../actions/UserSlice';

export default configureStore({
	reducer: {
		authLogin: authLoginReducer,
		taskAction: taskReducer,
		companyAction: companyReducer,
		userAction: userReducer,
	},
});
