import axios from 'axios';

const API = axios.create({
	baseURL: 'https://server-mu-beige.vercel.app/api/auth',
	"Access-Control-Allow-Credentials": true,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
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
	}
);


export const signout = async () => API.post('/logout');
