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

export const createProductAsync = createAsyncThunk(
  '/products/createProduct',
  async ({ name, description, price, image, category }) => {
    try {
      const { data } = await axios.post('/api/products', {
        name,
        description,
        price,
        image,
        category,
      });
      return data;
    } catch (error) {
      next(error);
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
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      return state.push(action.payload);
    });
  },
});

export default productsSlice.reducer;

export const selectProducts = (state) => state.products;
