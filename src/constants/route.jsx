import React from 'react';
import LandingPage from '../pages/Landing Page/Content';
import Login from '../pages/Login/Login';
import SignUp from '../pages/Sign Up/SignUp';
import MainPage from '../pages/Dashboard/MainPage';
import PrivateRoute from '../route/PrivateRoute';
import Profile from '../pages/Profile/Profile';
import FAQ from "../pages/FAQ/FAQ";
import Download from '../pages/Download Page/Download';
import Group from '../pages/Group/Group';
import ContactSection from "../pages/Contact/Contact";
import { LicenseSection } from '../pages/License/License';
const routes = [
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/faq',
		element: <FAQ />,
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<MainPage />
			</PrivateRoute>
		),
	},
	{
		path: '/profile',
		element: (
			<PrivateRoute>
				<Profile />
			</PrivateRoute>
		),
	},
	{
		path: '/group',
		element: (
			<PrivateRoute>
				<Group />
			</PrivateRoute>
		),
	},
	{
		path: '/download',
		element: <Download />,
	},
	{
		path: '/contact',
		element: <ContactSection />,
	},
	{
		path: '/license',
		element: <LicenseSection />,
	}
];

export default routes;
