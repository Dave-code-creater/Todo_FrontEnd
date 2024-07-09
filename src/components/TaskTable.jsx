import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/actions/TaskSlice';
import { jwtDecode } from 'jwt-decode';

const useTasks = () => {
	const { tasks, status, error } = useSelector((state) => state.taskAction);
	const dispatch = useDispatch();
	const id = jwtDecode(localStorage.getItem('refreshToken')).userId;
	useEffect(() => {
		dispatch(fetchTasks(id));
	}, []);

	if (tasks.length === 0) {
		return [];
	}

	return tasks;
};

export default useTasks;
