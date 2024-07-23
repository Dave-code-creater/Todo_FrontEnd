import axios from 'axios';

const API = axios.create({
	baseURL: 'https://server-mu-beige.vercel.app/api', // Use baseURL instead of origin
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
		Accept: 'application/json',
	},
});

export const getTasks = async (id) =>
	API.get(`/task/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		}
	);

export const deleteTask = async (id) =>
	API.delete(`/task/${id}`, { // Adjust endpoint if needed
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		}
	);
