import { createSlice } from '@reduxjs/toolkit';

import initialOrderState from '@/constants/initialOrderState';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		order: initialOrderState,
	},
	reducers: {
		addOrder: (state, action) => {
			
		},
	},
});

export const { addOrder } = userSlice.actions;

export default userSlice.reducer;
