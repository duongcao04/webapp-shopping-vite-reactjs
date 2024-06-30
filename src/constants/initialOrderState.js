const initialOrderState = {
  createdAt: '',
  orderStatus: 'pending',
  information: {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    note: '',
  },
  order: {
    productList: [],
    shipping: 0,
    total: 0,
  },
};
export default initialOrderState;
