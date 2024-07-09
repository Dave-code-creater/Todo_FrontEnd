import axios from 'axios';

const API = axios.create({
	baseURL: 'http://192.168.2.137:3003',
	'Access-Control-Allow-Credentials': true,
});

export const getTasks = async (id) =>
	API.get(`/task/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
		},
	});

export const addTask = async ({
	title,
	description,
	status,
	userId,
	type,
	deadline,
}) =>
	API.post(
		`/task/${userId}/`,
		{
			title,
			description,
			status,
			userId,
			type,
			deadline,
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
			},
		}
	);

export const deleteTask = async (id) =>
	API.delete(`/tasks/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
		},
	});

export const updateTask = async ({
	id,
	title,
	description,
	status,
	userId,
	type,
}) =>
	API.put(
		`/tasks/${id}`,
		{
			title,
			description,
			status,
			userId,
			type,
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
			},
		}
	);
