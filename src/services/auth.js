import axios from 'axios';

const API = axios.create({
	origin: 'http://www.danhsachcongviec.site',
	'Access-Control-Allow-Credentials': true,
});

export const signin = async ({ email, password }) =>
	API.post('/auth/login', {
		email,
		password,
	});

export const signup = async ({ username, email, password }) =>
	API.post('/auth/register', {
		username,
		email,
		password,
	});

export const signout = async () => API.post('/auth/logout');
