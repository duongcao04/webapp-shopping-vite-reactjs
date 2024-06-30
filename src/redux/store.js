import { configureStore } from '@reduxjs/toolkit';

import userReducer from '@/redux/user.reducer';
import authReducer from './auth.reducer';
import productReducer from '@/redux/product.reducer';
import cartReducer from '@/redux/cart.reducer';

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
