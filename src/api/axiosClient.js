import queryString from 'query-string';
import axios from 'axios';
import Cookies from 'universal-cookie';

const apiUrl = import.meta.env.VITE_API_URL;

const cookies = new Cookies(null, { path: '/' });

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = cookies.get('token')
    config.headers.Authorization =  token ? `Bearer ${token}` : '';

    return config;
});

export default axiosClient;