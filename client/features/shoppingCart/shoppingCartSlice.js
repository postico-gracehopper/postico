import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetches this user's shopping cart
export const fetchAllUserItemsAsync = createAsyncThunk(
  'GET AllUserItems',
  async (userId) => {
    const { data } = await axios.get(`/api/users/${userId}/cart`);
    return data;
  }
);

const initialState = {
  shoppingCart: {},
  isFetching: true,
  error: null,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserItemsAsync.fulfilled, (state, action) => {
      state.shoppingCart = action.payload;
    });
  },
});

export default shoppingCartSlice.reducer;

/*
  SELECTOR
*/
export const selectShoppingCart = (state) => {
  return state.shoppingCart;
};
