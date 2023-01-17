import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSingleProductAsync = createAsyncThunk(
  '/products/fetchSingleProduct',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`, 
        {headers: {authorization: window.localStorage.getItem("token")}});
      return data;
    } catch (err) {
      next(err);
    }
  }
);

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default singleProductSlice.reducer;

export const selectSingleProduct = (state) => state.singleProduct;
