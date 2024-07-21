import axios from 'axios';

const API = axios.create({
	baseURL: 'https://server-s43nb4qicq-as.a.run.app/api/auth',
	"Access-Control-Allow-Credentials": true,
	withCredentials: true
});

export const signin = async ({ email, password }) =>
	API.post('/login', {
		email,
		password,
	});

export const signup = async ({ username, email, password }) =>
	API.post('/register', {
		username,
		email,
		password,
	});

export const signout = async () => API.post('/logout');
