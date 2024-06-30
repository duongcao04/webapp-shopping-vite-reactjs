import axiosClient from './axiosClient';

const postApi = {
  getAll: async (params) => {
    const url = '/post';
    return await axiosClient.get(url, { params });
  },
  getOne: async (postId, params) => {
    const url = `/post/${postId}`;
    return await axiosClient.get(url, { params });
  },
  getNewestPost: async () => {
    const url = '/post';
    const res = await axiosClient.get(url, { sortBy: '-createdAt' });
    return res.data.elements[0]
  },
  deletePost: (postId, params) => {
    const url = `/post/${postId}`;
    return axiosClient.delete(url, { params });
  },
  createPost: (newPost) => {
    const url = '/post/create';
    return axiosClient.post(url, newPost);
  }
};

export default postApi;
