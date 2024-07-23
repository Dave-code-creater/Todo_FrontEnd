import axios from 'axios';

const API = axios.create({
	baseURL: 'https://server-s43nb4qicq-as.a.run.app/api', // Use baseURL instead of origin
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
		Accept: 'application/json',
	},
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
		`/task/${userId}/`, // Verify this endpoint in your API
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
	API.delete(`/task/${id}`, { // Adjust endpoint if needed
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
		`/task/${id}`, // Adjust endpoint if needed
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
