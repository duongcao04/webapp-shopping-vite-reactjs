import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: [],
  },
  reducers: {
    getProduct: (state, action) => {
      state.productList = action.payload;
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      state.productList.push(newProduct);
      alert('Thêm sản phẩm thành công');
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const foundProductIndex = state.productList.findIndex(
        (product) => product._id === productId
      );

      if (foundProductIndex !== -1) {
        state.productList.splice(foundProductIndex, 1);
      }
    },
  },
});

export const { getProduct, addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
