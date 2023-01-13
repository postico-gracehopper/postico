import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSingleUserAsync = createAsyncThunk(
  '/users/fetchSingleUser',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (err) {
      next(err);
    }
  }
);

const singleUserSlice = createSlice({
  name: 'singleUser',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default singleUserSlice.reducer;

export const selectSingleUser = (state) => state.singleUser;
