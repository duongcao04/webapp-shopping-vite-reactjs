import axiosClient from './axiosClient';

const productApi = {
  getAll: async (params) => {
    const url = '/product';
    return await axiosClient.get(url, { params });
  },
  pagination: (params) => {
    const url = '/product/pagination';
    return axiosClient.get(url, { params });
  },
  filter: (params) => {
    const url = '/product/filter';
    return axiosClient.get(url, { params });
  },
  getOne: (productId, params) => {
    const url = `/product/${productId}`;
    return axiosClient.get(url, { params });
  },
  getCategory: (params) => {
    const url = '/category';
    return axiosClient.get(url, { params });
  },
  getSupplier: (params) => {
    const url = '/supplier';
    return axiosClient.get(url, { params });
  },
  createProduct: async (product) => {
    const url = '/product/create';
    return await axiosClient.post(url, product);
  },
  deleteProduct: (productId, params) => {
    const url = `/product/${productId}`;
    return axiosClient.delete(url, { params });
  },
  updateProduct: (productId, updatedProduct) => {
    const url = `/product/${productId}`;
    return axiosClient.put(url, updatedProduct);
  },
};

export default productApi;
