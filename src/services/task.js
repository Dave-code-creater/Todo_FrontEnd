import axios from 'axios';

const API = axios.create({
	baseURL: 'https://server-mu-beige.vercel.app/api',
	withCredentials: true,
	headers: {
	  'Content-Type': 'application/json',
	  'Accept': 'application/json',
	},
  });
  
  // Add the token to the header of each request dynamically
  API.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
	  config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
  }, (error) => {
	return Promise.reject(error);
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
