import axios from 'axios';

const API = axios.create({
	origin: 'https://server-s43nb4qicq-as.a.run.app/api',
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
