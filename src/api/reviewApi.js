import axiosClient from './axiosClient';

const reviewApi = {
	getAllReview: async (params) => {
		const url = '/review';
		return await axiosClient.get(url, { params });
	},
	createNewReview: async (newReview) => {
		const url = '/review/create';
		return await axiosClient.post(url, newReview);
	},
};

export default reviewApi;
