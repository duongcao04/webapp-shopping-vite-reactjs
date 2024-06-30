import axiosClient from './axiosClient';

const voucherApi = {
	getAllVoucher: async (params) => {
		const url = '/voucher';
		return await axiosClient.get(url, { params });
	},
	createNewVoucher: async (newVoucher) => {
		const url = '/voucher/create';
		return await axiosClient.post(url, newVoucher);
	},
	deleteVoucher: (voucherId, params) => {
		const url = `/voucher/${voucherId}`;
		return axiosClient.delete(url, { params });
	},
	getVoucherByCode: (voucherCode, params) => {
		const url = `/voucher/${voucherCode}`;
		return axiosClient.get(url, { params });
	},
};

export default voucherApi;
