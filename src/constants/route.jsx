import React from 'react';
import LandingPage from '../pages/Landing Page/Content';
import Login from '../pages/Login/Login';
import SignUp from '../pages/Sign Up/SignUp';
import MainPage from '../pages/Dashboard/MainPage';
import PrivateRoute from '../route/PrivateRoute';

const routes = [
	{
		path: '/',
		element: <LandingPage />,
		exact: true,
	},
	{
		path: '/login',
		element: <Login />,
		exact: true,
	},
	{
		path: '/signup',
		element: <SignUp />,
		exact: true,
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<MainPage />
			</PrivateRoute>
		),
		exact: true,
	},
];

export default routes;
