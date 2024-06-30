import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: () => {
    const getCart = JSON.parse(localStorage.getItem('_cart'));
    const getTotalAmount = JSON.parse(localStorage.getItem('_cart-total'));

    if (getCart) {
      return {
        voucher: null,
        cartList: getCart,
        totalAmount: getTotalAmount,
      };
    }

    return {
      voucher: null,
      cartList: [],
      totalAmount: 0,
    };
  },
  reducers: {
    resetCart: (state) => {
      state.cartList = [];
      state.totalAmount = 0;
      state.voucher = null;
    },
    addCart: (state, action) => {
      const newProduct = action.payload;
      const foundProductExist = state.cartList.findIndex(
        (product) => product._id === newProduct._id
      );
      if (foundProductExist === -1) {
        const newProductWithQuantity = { ...newProduct, quantity: 1 };
        state.cartList.push(newProductWithQuantity);
      } else {
        state.cartList[foundProductExist].quantity++;
      }

      let totalAmount = function () {
        var total = 0;
        state.cartList.forEach(
          (product) => (total += product.price * product.quantity)
        );
        return total;
      };
      state.totalAmount = totalAmount();

      localStorage.setItem('_cart', JSON.stringify(state.cartList));
      localStorage.setItem('_cart-total', JSON.stringify(state.totalAmount));
    },
    deleteCart: (state, action) => {
      const productId = action.payload;
      const foundProductIndex = state.cartList.findIndex(
        (product) => product._id === productId
      );

      if (foundProductIndex !== -1) {
        state.totalAmount =
          state.totalAmount -
          state.cartList[foundProductIndex].price *
          state.cartList[foundProductIndex].quantity;
        state.cartList.splice(foundProductIndex, 1);
      }

      localStorage.setItem('_cart', JSON.stringify(state.cartList));
      localStorage.setItem('_cart-total', JSON.stringify(state.totalAmount));
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const foundProductIndex = state.cartList.findIndex(
        (product) => product._id === productId
      );
      if (foundProductIndex !== -1) {
        state.totalAmount =
          state.totalAmount + state.cartList[foundProductIndex].price;
        state.cartList[foundProductIndex].quantity++;
      }

      localStorage.setItem('_cart', JSON.stringify(state.cartList));
      localStorage.setItem('_cart-total', JSON.stringify(state.totalAmount));
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const foundProductIndex = state.cartList.findIndex(
        (product) => product._id === productId
      );
      if (foundProductIndex !== -1) {
        state.totalAmount =
          state.totalAmount - state.cartList[foundProductIndex].price;
        state.cartList[foundProductIndex].quantity--;
      }

      localStorage.setItem('_cart', JSON.stringify(state.cartList));
      localStorage.setItem('_cart-total', JSON.stringify(state.totalAmount));
    },
    addVoucher: (state, action) => {
      state.voucher = action.payload;
    },
  },
});

export const {
  resetCart,
  addCart,
  deleteCart,
  incrementQuantity,
  decrementQuantity,
  addVoucher,
} = cartSlice.actions;

export default cartSlice.reducer;
