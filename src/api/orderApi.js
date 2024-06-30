import axiosClient from './axiosClient';

const orderApi = {
  getAll: (params) => {
    const url = '/order';
    return axiosClient.get(url, { params });
  },
  getOrderById: (orderId, params) => {
    const url = `/order/${orderId}`;
    return axiosClient.get(url, { params });
  },
  createOrder: (order) => {
    const url = `/order/create`;
    return axiosClient.post(url, order);
  },
  updateOrder: (orderId, order) => {
    const url = `/order/${orderId}`;
    return axiosClient.put(url, order);
  },
  deleteOrder: (orderId, params) => {
    const url = `/order/${orderId}`;
    return axiosClient.delete(url, { params });
  },
};

export default orderApi;
