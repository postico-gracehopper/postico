import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSingleProductAsync = createAsyncThunk(
  '/products/fetchSingleProduct',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`, {
        headers: { authorization: window.localStorage.getItem('token') },
      });
      return data;
    } catch (err) {
      next(err);
    }
  }
);

const initialState = {
  quantity: 1,
};

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    changeQuantity(state, action) {
      state.quantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default singleProductSlice.reducer;
export const { changeQuantity } = singleProductSlice.actions;
export const selectQuantity = (state) => state.singleProduct.quantity;
export const selectSingleProduct = (state) => state.singleProduct;
