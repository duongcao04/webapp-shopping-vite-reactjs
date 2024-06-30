import axiosClient from './axiosClient';

const userApi = {
  getAll: (params) => {
    const url = '/user';
    return axiosClient.get(url, { params });
  },
  getUserProfile: (userId, params) => {
    const url = `/user/${userId}`;
    return axiosClient.get(url, { params });
  },
  deleteUser: (userId, params) => {
    const url = `/user/${userId}`;
    return axiosClient.delete(url, { params });
  },
};

export default userApi;
