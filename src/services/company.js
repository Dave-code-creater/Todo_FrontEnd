import axios from 'axios';


const API = axios.create({
	baseURL: 'https://server-mu-beige.vercel.app/api/group',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

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

export const getCompany = async (id) => {

    const response = await API.get(`${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const getEmployeeByCompanyUUID = async (companyUUID) => {
    const response = await API.get(`/${companyUUID}/employees`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const createCompany = async (company) => {
    console.log(company);
    const response = await API.post('/', { ...company }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response;
};

export const updateCompany = async (company) => {
    const response = await API.put(`/${company.id}`, company);
    return response;
};

export const deleteCompany = async (company) => {
    const response = await API.delete(`/${company.id}`);
    return response;
};

export const addEmployee = async ({companyUUID,id}) => {
    await API.post('/employees', { companyUUID,id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    
};

export const removeEmployee = async (employee) => {
    const response = await API.delete(`/employee/${employee.id}`);
    return response;
};

export const updateEmployee = async (employee) => {
    const response = await API.put(`/employee/${employee.id}`, employee);
    return response;
};

export const getEmployee = async () => {
    const response = await API.get('/employee');
    return response;
};

export const getEmployeeById = async (id) => {
    const response = await API.get(`/employee/${id}`);
    return response;
};

export const getCompanyById = async (id) => {
    const response = await API.get(`/${id}`);
    return response;
};

export const getEmployeeByCompanyId = async (id) => {
    const response = await API.get(`/employee/company/${id}`);
    return response;
};

