import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProductsAsync = createAsyncThunk(
  '/products/fetchProductsAsync',
  async () => {
    try {
      const { data } = await axios.get('/api/products');
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productsSlice.reducer;

export const selectProducts = (state) => state.products;
