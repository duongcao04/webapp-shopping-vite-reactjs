import axiosClient from './axiosClient';

const authApi = {
    registerUser: (user) => {
        const url = 'user/register';
        return axiosClient.post(url, user);
    },
    loginUser: (user) => {
        const url = 'user/login';
        return axiosClient.post(url, user);
    },
};

export default authApi;
