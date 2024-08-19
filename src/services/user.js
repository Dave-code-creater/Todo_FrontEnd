import axios from 'axios';

const API = axios.create({
	baseURL: 'https://server-mu-beige.vercel.app/api/user',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});
// Add the token to the header of each request dynamically
API.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const getUserById = async (id) => {

    const response = await API.get(`/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
}

export const updateUser = async (user) => {
    const response = await API.put(`/${user.id}`, user);
    return response;
}

export const deleteUser = async (user) => {
    const response = await API.delete(`/${user.id}`);
    return response;
}

export const createUser = async (user) => {
    const response = await API.post('/', user);
    return response;
}

export const getUsers = async () => {
    const response = await API.get('/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
}
