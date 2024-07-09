import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const isAuthenticated = localStorage.getItem('refreshToken');

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	return children;
};

export default PrivateRoute;
